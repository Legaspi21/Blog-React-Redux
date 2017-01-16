import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

const FIELDS = {
	title: {
		type: 'input',
		label: 'Title for Post'
	},
	categories: {
		type: 'input',
		label: 'Enter some categories for this post'
	},
	content: {  
		type: 'textarea',
		label: 'Post Contents'
	}
};
// ['title', 'categories', 'content'];

class PostsNew extends Component {
	static contextTypes = {
		router: PropTypes.object
	}

	onSubmit(props) {
		this.props.createPost(props)
			.then(() => {
				// blog has been created now nav the user to the index
				// we nav by calling this.context.router.push with the
				// new path to navigate to.
				this.context.router.push('/')
			});
	}

	renderField(fieldConfig, field) {
		const fieldHelper = this.props.fields[field];
		return (
			<div key={fieldConfig.label.length} className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`}>
				<label>{fieldConfig.label}</label>
				<fieldConfig.type type="text" className="form-control" {...fieldHelper}/>
				<div className="text-help">
					{fieldHelper.touched ? <p className='animated shake'>{fieldHelper.error}</p> : ''}
				</div>
			</div>
		);
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<h3>Create A New Post</h3>
				{_.map(FIELDS, this.renderField.bind(this))}
				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
			)
	}
}

function validate(values) {
	const errors = {};

	_.each(FIELDS, (type, field) => {
		if (!values[field]) {
			errors[field] = `Enter a ${field}`;
		}
	});

	return errors;
}

// connect: first argument is mapStateToProps, 2nd mapDispatchToProps
// reduxForm: first is config, mapStateTopProps, M

export default reduxForm({ 
	form: 'PostsNew',
	fields: _.keys(FIELDS),
	validate
}, null, { createPost })(PostsNew);