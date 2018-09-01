import React from 'react';
import { DragSource, DropTarget, } from 'react-dnd';
// import { PropTypes } from 'prop-types';
import flow from 'lodash/flow'
// import { findDOMNode } from 'react-dom'
import styled from 'styled-components';

import Item from './Item';


//
// const style = {
// 	border: '1px dashed gray',
// 	padding: '0.5rem 1rem',
// 	marginBottom: '.5rem',
// 	backgroundColor: 'white',
// 	cursor: 'move',
// }

const subitemSource  = {
  beginDrag(props) {
    return ({
      props
    });
  },

};

const subitemTarget = {

  drop(props, monitor, component ) {

    const dragId = monitor.getItem().props.id
    // console.log(monitor)
		const hoverId = props.id


    props.combineItems(dragId, hoverId)


  },
	hover(props, monitor, component) {
    const hoverId = props.id;
    // console.log(hoverId, 'hover Id')
    const isJustOverThisOne = monitor.isOver({ shallow: true });
    // console.log(isJustOverThisOne)
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
 render(props) {
		const {
			item,
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
            <SubItemDiv>Sub item
              <div className={this.props.isOver ? "hover" : null}>
                <h4>sub item text</h4>
                {this.props.item.contains ?
                   (item.contains.map((item, index) => {
                  return (
										<div key={index} className="subSubItem">
											<Item
	                      key={index}
	                      index={index}
	                      item={item}
	                      id={item.id}
	                      text={item.text}
	                      contains={item.contains}
	                      combineItems={this.props.combineItems} />
										</div>
                  )
                })) :
                 <div>no subsubitems </div>}

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
