import * as ActionTypes from '../actions';
import { combineReducers } from 'redux';
import fields from './fields';
import form from './form';
import sections from './sections';
import prebuiltFields from './prebuiltFields';

const entitiesReducer = combineReducers({
  form,
  fields,
  sections,
  prebuiltFields
});

export default entitiesReducer;
