import * as ActionTypes from '../actions';
import { combineReducers } from 'redux';
import fields from './fields';
import options from './options';
import form from './form';
import sections from './sections';
import prebuiltFields from './prebuiltFields';

const entitiesReducer = combineReducers({
  options,
  fields,
  sections,
  form,
  prebuiltFields
});

export default entitiesReducer;
