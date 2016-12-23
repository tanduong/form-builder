import * as ActionTypes from '../actions';
import { combineReducers } from 'redux';
import fields from './fields';
import sections from './sections';
import prebuiltFields from './prebuiltFields';

const entitiesReducer = combineReducers({
  fields,
  sections,
  prebuiltFields
});

export default entitiesReducer;
