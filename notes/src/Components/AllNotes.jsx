import React from 'react';
import { DropTarget, } from 'react-dnd';
import styled from 'styled-components';

import Item from './Item';

const AllNotes = (props) => {
  console.log(props)
    props.connectDropTarget(
      <div>
        <AllNotesDiv>hh
          {props.topList.map((item, index) => {
            return (
              <Item
                key={item.id}
                item={item}
                id={item.id}
                combineItems={this.combineItems} />
            )
          })}
        </AllNotesDiv>
      </div>
		)
}

const specObj =  {
  drop(props, monitor, component){
    // console.log(props, monitor, component )
    const dragId = monitor.getItem().props.id
		// const isJustOverThisOne = monitor.isOver({ shallow: true });
    // console.log(monitor)
		const hoverId = props.item.id

		if (hoverId === dragId) {
			return
		} else {
			props.combineItems(dragId, hoverId)
		}

  }
}

const collect = (connect, monitor) => ({
  	connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  })

export default DropTarget('item', specObj, collect)(AllNotes)


const AllNotesDiv = styled.div`
  border: 2px solid red;
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
