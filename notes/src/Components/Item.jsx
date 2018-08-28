import React from 'react';
import { DragSource, DropTarget, } from 'react-dnd';
// import { PropTypes } from 'prop-types';

import flow from 'lodash/flow'
// import { findDOMNode } from 'react-dom'
import styled from 'styled-components';
import SubItem from './SubItem'

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

  },
  hover(props, monitor, component) {
    const hoverId = props.id;
    // console.log(hoverId, 'hover Id')
    const isJustOverThisOne = monitor.isOver({ shallow: true });
    // console.log(isJustOverThisOne)
  }
}

class Item extends React.Component {
 render(props) {
		const {

			isDragging,
			connectDragSource,
			connectDropTarget,
      contains,
      item
		} = this.props

		return (
			connectDragSource &&
			connectDropTarget &&
			connectDragSource(
				connectDropTarget(
          <div>
            <ItemDiv>
							Item
              <div className={this.props.isOver ? "hover" : null}>
                <h4>{item.text}</h4>
                <div className="allSubItems">
                  {item.contains ? (contains.map((item, index) => {

										return (

											<SubItem
													key={index}
												 item={item}
												 className="subItem"
											 	combineItems={this.props.combineItems} />

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
  DropTarget('item', itemTarget, (connect, monitor) => ({
  	connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
  })),
)(Item)


const ItemDiv = styled.div`
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
    .allSubItems {
      border: 1px solid blue;
      display: flex;
    }
`;
