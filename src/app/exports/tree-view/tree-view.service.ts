import { Injectable } from '@angular/core';

@Injectable()
export class TreeViewService {

  // constructor() {
  //
  // }

  getSelectNodes(treeData: any[], valueField: string) {
    const matchedItems = this.innerGetMatchedItems(null, treeData, (node) => node.$$select);
    return matchedItems.map((item) => item.node[valueField]);
  }

  getCheckedNodes(treeData: any[], valueField: string) {
    const matchedItems = this.innerGetMatchedItems(null, treeData, (node) => node.$$check);
    return matchedItems.map((item) => item.node[valueField]);
  }

  getMatchedItems(treeData: any[], match: (node: any) => boolean) {
    return this.innerGetMatchedItems(null, treeData, match);
  }

  getFirstMatchedItem(treeData: any[], match: (node: any) => boolean) {
    return this.innerGetFirstMatchedItem(null, treeData, match);
  }

  getTreeNodeByValue(treeData: any[], valueField: string, value: any) {
    return this.innerGetFirstMatchedItem(null, treeData, (node) => node[valueField] === value);
  }

  expendAllNodes(treeData: any[]) {
    this.innerLookNode(null, treeData, (node) => {
      node.$$expend = true;
    });
  }

  collapseAllNodes(treeData: any[]) {
    this.innerLookNode(null, treeData, (node) => {
      node.$$expend = false;
    });
  }

  checkAllNodes(treeData: any[]) {
    this.innerLookNode(null, treeData, (node) => {
      node.$$check = true;
    });
  }

  unCheckAllNodes(treeData: any[]) {
    this.innerLookNode(null, treeData, (node) => {
      node.$$check = false;
    });
  }


  appendNodes(treeData: any[], valueField: any, parentId, nodes: any[]) {
    const parentNode = this.getTreeNodeByValue(treeData, valueField, parentId);
    parentNode.node.children = parentNode.node.children || [];
    parentNode.node.children.push(...nodes);
    return parentNode;
  }

  removeNode(treeData: any[], valueField: string, value: any) {
    const node = this.getTreeNodeByValue(treeData, valueField, value);
    if (node.parent) {
      node.parent.children = node.parent.children.filter((nodeItem) => nodeItem[valueField] !== value);
    } else {
      const index = treeData.indexOf(node.node);
      if (index !== -1) {
        treeData.splice(index, 1);
      }
    }
    return node;
  }

  private innerLookNode(parent, items: any[], action: (node: any, parent: any) => void) {
    if (!items) {
      return;
    }

    const nodes = [];
    items.forEach((nodeItem) => {
      action(nodeItem, parent);
      this.innerLookNode(nodeItem, nodeItem.children, action);
    });

    return nodes;
  }

  private innerGetMatchedItems(parent, items: any[], match: (node: any) => boolean) {
    if (!items) {
      return [];
    }

    const nodes = [];
    items.forEach((nodeItem) => {
      if (match(nodeItem)) {
        nodes.push({ node: nodeItem, parent: parent });
      }
      nodes.push(...this.innerGetMatchedItems(nodeItem, nodeItem.children, match));
    });

    return nodes;
  }

  private innerGetFirstMatchedItem(parent, items: any[], match: (node: any) => boolean) {
    if (!items) {
      return;
    }

    for (let i = 0; i < items.length; i++) {
      const nodeItem = items[i];
      if (match(nodeItem)) {
        return { node: nodeItem, parent: parent };
      }
      const matchNode = this.innerGetFirstMatchedItem(nodeItem, nodeItem.children, match);
      if (matchNode) {
        return matchNode;
      }
    }
  }

}