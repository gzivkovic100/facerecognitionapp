import React from 'react';


class SignIn extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: '',
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value});
	}

	onSubmitSignIn = () => {
		fetch('http://localhost:3000/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})	
		})
			.then(response => response.json())
			.then(user => {
				if (user.id) {
					this.props.loadUser(user)
					this.props.onRouteChange('home');
				}
			})		
	}

	render () {
		const { onRouteChange } = this.props;
		return (
				<article className="ba br4 pa3 b--red-10 mv4 w-100 w-60-m w-25-l mw5 center shadow-5" style={{ position: 'relative' , zIndex: '100' }}>
	  				<main action="sign-up_submit" method="get" acceptCharset="utf-8">
	    				<fieldset id="sign_in" className=" b--transparent">
	      					<legend className="clip f1">Sign in</legend>
	      					<div className="mt3">
	        					<label className="db fw4 lh-copy f4" htmlFor="email-address">Email address</label>
	        					<input 
	        						onChange={this.onEmailChange}
	        						className="pa2 input-reset white ba bg-transparent" 
	        						type="email" 
	        						name="email-address"  
	        						id="email-address"
	        					/>
	      					</div>
	      					<div className="mt3">
	        					<label className="db fw4 lh-copy f4" htmlFor="password">Password</label>
	        					<input
	        						onChange={this.onPasswordChange} 
	        						className="pa2 input-reset white ba bg-transparent" 
	        						type="password" 
	        						name="password"  
	        						id="password"
	        					/>
	      					</div>
	    				</fieldset>
	    				<div className="mt2 mb2">
	    					<input
	    						onClick={this.onSubmitSignIn} 
	    						className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" 
	    						type="submit" 
	    						value="Sign In"
	    					/>
	    				</div>
	    				<p onClick={()=> onRouteChange('register')} className="mt2 mb2"><input className="input-reset bg-transparent grow pointer f6" type="submit" value="Register"/></p>
	  				</main>
				</article>
		);
	}
}

export default SignIn;




