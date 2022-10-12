import render_type from './render_style'

const initialRender = {
 value: false,
};

const automateRendering = (state = initialRender, action) => {
 if(action.type === render_type.RENDER_POST) {
  return {
   ...state,
   value: action.payload.value
  };
 }
 return state
}

export default automateRendering;