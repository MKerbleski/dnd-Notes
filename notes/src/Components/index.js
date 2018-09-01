import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import styled from 'styled-components';

import Item from './Item';

// const update = require('immutability-helper');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topList: [
          {id:1, contains: [], parents: []},
          {id:2, contains: [{id:21, contains: [], parentId: 2},{id:22, contains: [], parentId: 2},],},
          {id:3, contains: [],},
          {id:4, contains: [],},
          {id:5, contains: [],},
          {id:6, contains: [],},
        ],
      }
    }

  createNewItem(a, b){
    console.log({
      id: Date.now(),
      text: "newIte",
      contains: [a, b]
    }, "createNewItem")
  }

  moveUp = (dragId, hoverId, parentId) => {
    // console.log(parentId, "parentId")
    // console.log(dragId, "dragId")
    // console.log(hoverId, "hoverId")
  }

  combineItems = (dragId, hoverId, dragParentId, hoverParentId) => {
    console.log(dragParentId, "dragParentId")
    console.log(dragId, "dragId")
    console.log(hoverParentId, "hoverParentId")
    console.log(hoverId, "hoverId")

    const copyTopList = this.state.topList.slice();

    let dragItem = {};
    let dragParentItem = null;
    let hoverItem = {};
    let hoverParentItem = null;

    if (dragParentId) {
        dragParentItem = copyTopList.find(items => {
          return items.id === dragParentId
     })
     dragItem = dragParentItem.contains.find(item => {
       return item.id === dragId
     })
   } else {
     dragItem = copyTopList.find(item => {
       return item.id === dragId
     })
   }
   console.log("Drag Parent: ", dragParentItem)
   console.log("Drag Item: ", dragItem)

   if (hoverParentId) {
       hoverParentItem = copyTopList.find(items => {
         return items.id === hoverParentId
    })
    hoverItem = hoverParentItem.contains.find(item => {
      return item.id === hoverId
    })
  } else {
    hoverItem = copyTopList.find(item => {
      return item.id === hoverId
    })
  }
  console.log("Hover Parent: ", hoverParentItem)
  console.log("Hover Item: ", hoverItem)

  let newTopList = [];

  if(!dragParentItem){
    let newTopList = copyTopList.filter(items => {
      return items.id !== dragId
    })
    this.setState({
      topList: newTopList
    })
  }
  //
  // console.log(newTopList)
  //
  //   console.log(dragItem, "dragItem");
  //
  //   let indexA = copyTopList.indexOf(dragItem);
  //   // console.log(indexA, "indexA");
  //
  //   copyTopList.splice(indexA, 1);
  //
  //   // console.log(copyTopList);
  //
  //
  //
  //   // console.log(itemB);
  //   let indexB = copyTopList.indexOf(itemB);
  //   // console.log(indexB);
  //   // console.log(copyTopList);
  //   copyTopList.splice(indexB, 1);
  //
  //   const newCombo = this.createNewItem(dragItem, itemB)
  //   newCombo.contains.push(dragItem, itemB);
  //   // console.log(newCombo)
  //   copyTopList.push(newCombo);
  //   // console.log(copyTopList)
  //   this.setState({
  //     topList: copyTopList,
  //     dragItem: dragItem.id,
  //     itemB: itemB.id,
  //     combo: newCombo
  //   })
  }

  render() {
    return (
      <NotesDiv>Notes
        {this.state.topList.map((item, index) => {
          return (
            <Item
              key={index}
              index={index}
              id={item.id}
              parentId={item.parentId}
              item={item}
              combineItems={this.combineItems} />
          )
        })}
        {(this.state.itemA) ?
          (<div>
            <p>ItemA: {this.state.itemA}</p>
            <p>ItemB: {this.state.itemB}</p>
            <p>combo: {this.state.combo.id}</p>
          </div>) :
        null}
      </NotesDiv>
    );
  }
}

export default DragDropContext(HTML5Backend)(List);

const NotesDiv = styled.div`
  border: 2px solid black;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
