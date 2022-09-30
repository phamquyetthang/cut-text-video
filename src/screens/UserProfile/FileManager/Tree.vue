<template>
  <v-card
    flat
    tile
    min-height="500px"
    class="d-flex flex-column folders-tree-card"
  >
    <div class="grow scroll-x">
      <v-treeview
        activatable
        :open="open"
        :active="active"
        :items="items"
        :search="filter"
        :load-children="readFolder"
        v-on:update:active="activeChanged"
        item-key="path"
        item-text="basename"
        dense
        transition
        class="folders-tree"
        style="width: 100%"
      >
        <template v-slot:prepend="{ item, open }">
          <v-icon v-if="item.type === 'dir'">{{
            open ? "mdi-folder-open-outline" : "mdi-folder-outline"
          }}</v-icon>
          <v-icon v-else>{{
            icons[item.extension.toLowerCase()] || icons["other"]
          }}</v-icon>
        </template>
        <template v-slot:label="{ item }">
          <span>
            {{ item.basename }}
          </span>
          <v-btn
            icon
            v-if="item.type === 'dir'"
            @click.stop="readFolder(item)"
            class="ml-1"
          >
            <v-icon class="pa-0 mdi-18px" color="grey lighten-1"
              >mdi-refresh</v-icon
            >
          </v-btn>
        </template>
      </v-treeview>
    </div>
    <v-divider></v-divider>
    <v-toolbar dense flat class="shrink">
      <v-text-field
        solo
        flat
        hide-details
        label="Filter"
        v-model="filter"
        prepend-inner-icon="mdi-filter-outline"
        class="ml-n3"
      ></v-text-field>
      <v-tooltip top open-delay="500">
        <template v-slot:activator="{ on }">
          <v-btn icon @click="init" v-on="on">
            <v-icon>mdi-collapse-all-outline</v-icon>
          </v-btn>
        </template>
        <span>Collapse All</span>
      </v-tooltip>
    </v-toolbar>
  </v-card>
</template>

<script>
import StorageApi from "@/services/StorageApi";
export default {
  props: {
    icons: Object,
    storage: String,
    path: String,
    refreshPending: Boolean,
    itemActive: Object,
    typeFileTarget: String
  },
  data() {
    return {
      open: [],
      active: [],
      items: [],
      filter: ""
    };
  },
  methods: {
    init() {
      this.open = [];
      this.items = [];
      // set default files tree items (root item) in nextTick.
      // Otherwise this.open isn't cleared properly (due to syncing perhaps)
      setTimeout(async () => {
        let children = [];
        this.$emit("loading", true);
        let response = await StorageApi.list({
          typeFileTarget: this.typeFileTarget
        });
        if (response && response.status === 200) {
          children = response.data.data;
        }
        children = children.map(item => {
          if (item.type === "dir") {
            return { ...item, children: [] };
          }
          return item;
        });
        this.items = children;
        this.$emit("loading", false);
      }, 0);
    },
    async readFolder(item) {
      this.$emit("loading", true);
      if (!item) {
        item = {
          path: "/"
        };
      }
      let response = await StorageApi.list({
        path: item.path,
        typeFileTarget: this.typeFileTarget
      });
      if (response && response.status === 200) {
        if (item.path === "/") {
          let listResult = response.data.data;
          this.items = this.items.filter(itemx => {
            for (let i = 0; i < listResult.length; i++) {
              if (listResult[i].path === itemx.path) {
                return true;
              }
            }
            return false;
          });

          let listItemRes = response.data.data.filter(item => {
            for (let i = 0; i < this.items.length; i++) {
              const itemCurrent = this.items[i];
              if (itemCurrent.path === item.path) {
                return false;
              }
            }
            return true;
          });
          for (let i = 0; i < listItemRes.length; i++) {
            const itemNew = listItemRes[i];
            if (itemNew.type === "dir") {
              this.items.push({ ...itemNew, children: [] });
            } else {
              this.items.push({ ...itemNew });
            }
          }
        } else {
          item.children = response.data.data.map(item => {
            if (item.type === "dir") {
              item.children = [];
            }
            return item;
          });
        }
      }
      this.$emit("loading", false);
    },
    findItemActive(path, listItem) {
      for (const item of listItem) {
        if (item.path === path) {
          return item;
        }
        if (item.children) {
          let result = this.findItemActive(path, item.children);
          if (result != null) {
            return result;
          }
        }
      }
      return null;
    },
    activeChanged(active) {
      this.active = active;
      let path = "";
      if (active.length) {
        path = active[0];
      }
      if (this.path != path) {
        this.$emit("path-changed", path);
      }
      let itemActive = this.findItemActive(active[0], this.items);
      this.$emit("setItemActive", itemActive);
    },
    findItem(path) {
      let stack = [];
      stack.push(this.items[0]);
      while (stack.length > 0) {
        let node = stack.pop();
        if (node.path == path) {
          return node;
        } else if (node.children && node.children.length) {
          for (let i = 0; i < node.children.length; i++) {
            stack.push(node.children[i]);
          }
        }
      }
      return null;
    }
  },
  watch: {
    storage() {
      this.init();
    },
    path() {
      let path = this.path;
      this.active = [path];
      // if (!this.open.includes(path)) {
      //   this.open.push(path);
      // }

      let l = path.split("/").filter(x => x !== "");
      let currentPath = "";
      for (let i = 0; i < l.length; i++) {
        let p = currentPath + l[i] + "/";
        currentPath += l[i] + "/";
        if (!this.open.includes(p)) {
          this.open.push(p);
        }
      }
    },
    async refreshPending() {
      if (this.refreshPending) {
        let item = this.findItemActive(this.path, this.items);
        if (item && item.type === "file") {
          let pathParrent = item.path.replace(item.basename, "");
          let newItem = this.findItemActive(pathParrent, this.items);
          if (newItem) {
            item = newItem;
          }
        } else if (item && item.type === "dir" && this.itemActive.isDelete) {
          let pathParrent = item.path.replace(item.basename + "/", "");
          let newItem = this.findItemActive(pathParrent, this.items);
          item = newItem;
        }
        await this.readFolder(item);
        if (item) {
          this.active = [item.path];
        } else {
          this.active = [];
        }
        this.$emit("refreshed");
      }
    }
  },
  created() {
    this.init();
  }
};
</script>

<style>
.folders-tree-card {
  height: 100%;
}
.folders-tree-card .scroll-x {
  overflow-x: auto;
}

.folders-tree-card .folders-tree {
  width: fit-content;
  min-width: 250px;
}
.folders-tree-card .folders-tree .v-treeview-node {
  cursor: pointer;
}
.folders-tree-card .folders-tree .v-treeview-node:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.v-card {
  display: flex !important;
  flex-direction: column;
}

.v-card__text {
  flex-grow: 1 !important;
  overflow: auto;
}
</style>



// WEBPACK FOOTER //
// src/screens/UserProfile/FileManager/Tree.vue