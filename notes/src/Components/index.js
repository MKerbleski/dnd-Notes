import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

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


  combineItems = (dragIndex, hoverIndex) => {
    console.log(dragIndex)
    console.log(hoverIndex)
    const { topList } = this.state
    const copyTopList = this.state.topList.slice();
    console.log(copyTopList);
    let itemA = copyTopList.find(items => {
       return items.id === dragIndex
    })
    console.log(copyTopList);
    console.log(itemA);

    let indexA = copyTopList.indexOf(itemA);
    console.log(indexA);

    copyTopList.splice(indexA, 1);

    console.log(copyTopList);


    let itemB = copyTopList.find(items => {
      return items.id === hoverIndex
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
      <div>
        Map of topList
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
      </div>
    );
  }
}


export default DragDropContext(HTML5Backend)(List);
