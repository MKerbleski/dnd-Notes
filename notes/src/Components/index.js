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
          {id:2, contains: [],},
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

  combineItems = (dragId, hoverId, parentId) => {
    console.log(parentId, "parentId")
    console.log(dragId, "dragId")
    console.log(hoverId, "hoverId")
    const copyTopList = this.state.topList.slice();

    let itemA = copyTopList.find(items => {
       return items.id === dragId
    })
    let itemB = copyTopList.find(items => {
      return items.id === hoverId
    });

// return the parent value as well and then just nest that and it doesn't have to search all sub values

    // console.log(copyTopList, "copyTopList");
    // console.log(itemA, "itemA");

    let indexA = copyTopList.indexOf(itemA);
    // console.log(indexA, "indexA");

    copyTopList.splice(indexA, 1);

    // console.log(copyTopList);



    // console.log(itemB);
    let indexB = copyTopList.indexOf(itemB);
    // console.log(indexB);
    // console.log(copyTopList);
    copyTopList.splice(indexB, 1);
    // console.log(copyTopList);
    const newCombo = {
      id: Date.now(),
      text: `${itemA} + " + " + ${itemB}`,
      child: true,
      contains: [],
    };
    // this.createNewItem(itemA, itemB)
    newCombo.contains.push(itemA, itemB);
    // console.log(newCombo)
    copyTopList.push(newCombo);
    // console.log(copyTopList)
    this.setState({
      topList: copyTopList,
    })
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
              item={item}
              combineItems={this.combineItems} />
          )
        })}
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
