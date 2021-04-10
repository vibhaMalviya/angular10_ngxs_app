import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DxTreeViewComponent } from 'devextreme-angular';

@Component({
  selector: 'analysis-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit {
  @ViewChild('tagTreeView') tagTreeView: DxTreeViewComponent;
  devexData: [];
  uriDevex: string;
  shiftKey: string;
  ctrlKey: boolean;
  startKey: number;
  endKey: number;
  selectedTags: [];
  shiftMultiSelected: boolean;

  constructor(private http: HttpClient) {
    this.shiftMultiSelected = false;
  }
  ngOnInit() {
    this.uriDevex = 'assets/products.json';
    this.getFiles(this.uriDevex).then(files => this.devexData = files);
    this.shiftKey = '';
    this.ctrlKey = false;
  }

  treeViewSelectionChanged(e) {
    const treeview = e.component;
    this.selectedTags = treeview.getSelectedNodes();
  }

  onSelectionClick(e){
    const event = e.event;
    const treeview = e.component;
    const metaKey = event.ctrlKey || event.metaKey;
    const shiftKey = event.shiftKey;
    if (metaKey) {
      if (!e.node.selected) {
        treeview.selectItem(e.node.key);
      } else {
        treeview.unselectItem(e.node.key)
      }
    }
    if (shiftKey) {
      this.endKey = e.node.key;
    } else {
      this.startKey = e.node.key;
      if (this.shiftMultiSelected) {
        this.deselectAll(treeview);
        this.shiftMultiSelected = false;
      }
    }
    if (this.startKey && this.endKey) {
      if (this.startKey > this.endKey) {
        this.swapKeys();
      }
      e.node.parent.items.forEach(v => {
        if (v.key >= this.startKey && v.key <= this.endKey) {
          v.selected = true;
          treeview.selectItem(v.key);
        }
      });
      this.startKey = 0;
      this.endKey = 0;
      this.shiftMultiSelected = true;
    }
    if (!metaKey && !shiftKey){
      this.deselectAll(treeview);
      treeview.selectItem(e.node.key);
    }
  }

  deselectAll(treeView) {
    var selected = treeView.getSelectedNodes();
    if (selected.length >0){
      treeView.unselectAll();
    }
  }

  getFiles(uri) {
    return this.http.get<any>(uri)
        .toPromise()
        .then(res => res.data);
  }

  swapKeys(){
    const tmp = this.startKey;
    this.startKey = this.endKey;
    this.endKey = tmp;
  }
  findNode(treeView, index) {
    const nodeElement = treeView.element().querySelectorAll('.dx-treeview-node')[index];
    if (nodeElement) {
      return this.findNodeById(treeView.getNodes(), nodeElement.getAttribute('data-item-id'));
    }
    return null;
  }

  findNodeById(nodes, id) {
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].key == id) {
        return nodes[i];
      }
      if (nodes[i].children) {
        const node = this.findNodeById(nodes[i].children, id);
        if (node != null) {
          return node;
        }
      }
    }
    return null;
  }
  getTreeView() {
    return this.tagTreeView.instance;
  }

  onDragStart(dragEvent, data) {
    dragEvent.dataTransfer.setData('text', JSON.stringify({ data }));
  }
  onDragOver(e) {
    console.log(e);
  }
}
