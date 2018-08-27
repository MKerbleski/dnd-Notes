import React from 'react';
import { DragSource, DropTarget, } from 'react-dnd';
import { PropTypes } from 'prop-types';
import flow from 'lodash/flow'
import { findDOMNode } from 'react-dom'
import styled from 'styled-components';

import Item from './Item';



const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	cursor: 'move',
}

const subitemSource  = {
  beginDrag(props) {
    console.log("beginDrag", props)
    return ({
      props
    });
  },

};

const subitemTarget = {

  drop(props, monitor, component ) {
    console.log(props, monitor, component )
    const dragId = monitor.getItem().props.id
    // console.log(monitor)
		const hoverId = props.id
    console.log(dragId, hoverId)

    props.combineItems(dragId, hoverId)


  }
}



// const collect = (connect, monitor) => ({
//   connectDragSource: connect.dragSource(),
//   isDragging: monitor.isDragging(),
// });

// export default DragSource(ITEM, ItemObj, collect)(Item);//HOC that ties the Source together
// export default DragSource(type, spec, collect)(MyComponent);

//---

class SubItem extends React.Component {
 render() {
		const {
			text,
			isDragging,
			connectDragSource,
			connectDropTarget,
      contains
		} = this.props
    console.log(this.props)
		return (
			connectDragSource &&
			connectDropTarget &&
			connectDragSource(
				connectDropTarget(
          <div className="subItem">
            <SubItemDiv>
              <div className={this.props.isOver ? "hover" : null}>
                <h4>{text}</h4>
                {this.props.item.contains.map((item, index) => {
                  return (
										<div className="subSubItem">
											<Item
	                      key={index}
	                      index={index}
	                      item={item}
	                      id={item.id}
	                      text={item.text}
	                      contains={item.contains}
	                      combineItems={this.combineItems} />
										</div>

                  )
                })}

              </div>
            </SubItemDiv>
          </div>

          ),
			)
		)
	}
}

export default flow(
  DragSource('item', subitemSource, (connect, monitor) => ({
  		connectDragSource: connect.dragSource(),
  		isDragging: monitor.isDragging(),
  	}),
  ),
  DropTarget('item', subitemTarget, (connect) => ({
  	connectDropTarget: connect.dropTarget(),
  })),
)(SubItem)

const SubItemDiv = styled.div`
  border: 2px solid blue;

  background: lightgreen;
	
  border-radius: 50px;
  padding: 25px;
  margin: 10px;
  .allSubItems {
    border: 1px solid blue;
    display: flex;
  }
	.subSubItems {
		background: lightgreen;

	}
`;
