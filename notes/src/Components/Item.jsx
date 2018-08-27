import React from 'react';
import { DragSource, DropTarget, } from 'react-dnd';
import { PropTypes } from 'prop-types';

import flow from 'lodash/flow'
import { findDOMNode } from 'react-dom'
import styled from 'styled-components';
import SubItem from './SubItem'

const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	cursor: 'move',
}

const itemSource  = {
  beginDrag(props) { // this mounts any props onto the object
    console.log("beginDrag", props)
    return ({
      props
    });
  },
};

const itemTarget = {
  drop(props, monitor, component ) {
    console.log(props, monitor, component )
    const dragId = monitor.getItem().props.id
    // console.log(monitor)
		const hoverId = props.id
    console.log(dragId, hoverId)
    props.combineItems(dragId, hoverId)
  },
  hover(props, monitor, component) {
    const hoverId = props.id;
    console.log(hoverId, 'hover Id')
    const isJustOverThisOne = monitor.isOver({ shallow: true });
    console.log(isJustOverThisOne)
  }
}

class Item extends React.Component {
 render(props) {
		const {
			text,
			isDragging,
			connectDragSource,
			connectDropTarget,
      contains,
      item
		} = this.props
    console.log(this.props)
		return (
			connectDragSource &&
			connectDropTarget &&
			connectDragSource(
				connectDropTarget(
          <div>
            <ItemDiv>
              <div >
                <h4>{text}</h4>
                <div className="allSubItems">
                  {item.contains ? (contains.map((item, index) => {
                    return (
                      <SubItem
                        key={index}
                        index={index}
                        item={item}
                        id={item.id}
                        text={item.text}
                        contains={item.contains}
                        combineItems={this.combineItems} // this should be a redux action
                       />
                    )
                  })) : <div>no subs</div>}
                </div>
              </div>
            </ItemDiv>
          </div>

          ),
			)
		)
	}
}

export default flow(
  DragSource('item', itemSource, (connect, monitor) => ({
  		connectDragSource: connect.dragSource(),
  		isDragging: monitor.isDragging(),
  	}),
  ),
  DropTarget('item', itemTarget, (connect) => ({
  	connectDropTarget: connect.dropTarget(),
  })),
)(Item)


const ItemDiv = styled.div`
    border: 2px solid red;
    background: lightgray;
    border-radius: 50px;
    padding: 25px;
    margin: 10px;
    .allSubItems {
      border: 1px solid blue;
      display: flex;
    }
`;
