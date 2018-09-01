import React from 'react';
import { DragSource, DropTarget, } from 'react-dnd';
// import { PropTypes } from 'prop-types';

import flow from 'lodash/flow'
// import { findDOMNode } from 'react-dom'
import styled from 'styled-components';
import Item from './Item'

// const style = {
// 	border: '1px dashed gray',
// 	padding: '0.5rem 1rem',
// 	marginBottom: '.5rem',
// 	backgroundColor: 'white',
// 	cursor: 'move',
// }

const itemSource  = {
  beginDrag(props) { // this mounts any props onto the object

    return ({
      props
    });
  },
};

const itemTarget = {
  drop(props, monitor, component ) {
    console.log(props)
    const dragId = monitor.getItem().props.id
    const dragParentId = monitor.getItem().props.item.parentId

		// const isJustOverThisOne = monitor.isOver({ shallow: true });
    // console.log(monitor)
		const hoverId = props.id
    const hoverParentId = props.item.parentId

    console.log(hoverParentId, 'hoverparentid')
    console.log(dragParentId, 'dragparentid')

		if (hoverId === dragId) {
			return
		} else {
			props.combineItems(dragId, hoverId, dragParentId, hoverParentId)
		}

  }
}

class Item2 extends React.Component {
 render(props) {
		const {
			connectDragSource,
			connectDropTarget,
		} = this.props

		return (
			connectDragSource &&
			connectDropTarget &&
			connectDragSource(
				connectDropTarget(
          <div>
            <Item2Div>
							Item
              <div className={this.props.isOver ? "drop" : null}>
                <h4>{this.props.id}</h4>
                <div className="allSubItems">
                  {this.props.item.contains ?
                     (this.props.item.contains.map((item, index) => {
    										return (
    											<Item
    												key={index}
    												item={item}
                            parentId={this.props.id}
    												className="subItem"
    											 	combineItems={this.props.combineItems} />
                        )
                  })) :
                  <div>no subs</div>}
                </div>
              </div>
            </Item2Div>
          </div>

          ),
			)
		)
	}
}

export default flow(
  DragSource('item', itemSource, (connect, monitor) => ({
  		connectDragSource: connect.dragSource(),
  	}),
  ),
  DropTarget('item', itemTarget, (connect, monitor) => ({
  	connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  })),
)(Item2)


const Item2Div = styled.div`
    border: 2px solid red;
    background: lightgray;
    border-radius: 50px;
    padding: 25px;
    margin: 10px;
		${'' /* .subItem {
			height: 50px;
			width: 50px;
		} */}
		.hover {
			background: blue;
			color: white;
		}
		.drop {
			background: pink;
			color: black;
		}
    .allSubItems {
      border: 1px solid blue;
      display: flex;
    }
`;
