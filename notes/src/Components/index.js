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
          {
            id: 54,
            text: "do groceries",
            contains: [],
          },
          {
            id: 34,
            text: "rotate tires",
            contains: [],
          },
          {
            id: 24,
            text: "go on date",
            contains: [],
          },
          {
            id: 67,
            text: "homework",
            contains: [
              {
                id: 31,
                text: "math",
                contains: [],
              },
              {
                text: "science",
                id: 90,
                contains: [
                  {
                    id: 321,
                    text: "physics",
                    contains: [],
                  },
                  {
                    id: 322,
                    text: "astronomy",
                    contains: [],
                  },
                ]
              },
            ]
          },
        ],
      }
    }


  combineItems = (dragId, hoverId) => {
    console.log(dragId, "dragId")
    console.log(hoverId, "hoverId")
    const copyTopList = this.state.topList.slice();
    console.log(copyTopList);
    let itemA = copyTopList.find(items => {
       return items.id === dragId
    })
    console.log(copyTopList, "copyTopList");

    console.log(itemA, "itemA");

    let indexA = copyTopList.indexOf(itemA);
    console.log(indexA, "indexA");

    copyTopList.splice(indexA, 1);

    console.log(copyTopList);


    let itemB = copyTopList.find(items => {
      return items.id === hoverId
    });

    console.log(itemB);

    let indexB = copyTopList.indexOf(itemB);
    console.log(indexB);

    console.log(copyTopList);

    copyTopList.splice(indexB, 1);

    console.log(copyTopList);

    const newCombo = {
      id: 243224,
      text: "combo",
      contains: [],
    };

    newCombo.contains.push(itemA, itemB);

    console.log(newCombo)

    copyTopList.push(newCombo);

    console.log(copyTopList)


    this.setState({
      topList: copyTopList,
    })

  }

  render() {
    return (
      <NotesDiv>

        {this.state.topList.map((item, index) => {
          return (
            <Item
              key={index}
              index={index}
              item={item}
              id={item.id}
              text={item.text}
              contains={item.contains}
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
