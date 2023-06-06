import React from 'react';


class Register extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			name: '',
		}
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value});
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value});
	}


	onSubmitSignIn = () => {
		fetch('http://localhost:3000/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				name: this.state.name
			})	
		})
			.then(response => response.json())
			.then(user => {
				if (user.id) {
					this.props.loadUser(user);
					this.props.onRouteChange('home');
					console.log(user);
				}
			})		
	}


	render () {
		return (
			<article className="ba br4 b--red-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5" style={{ position: 'relative' , zIndex: '100' }}>
  				<main className="black-80">
    				<fieldset id="sign_up" className="mt1 b--transparent">
      					<legend className="b clip f1">Register</legend>
      					<div className="mt3">
        					<label className="db fw4 lh-copy f4" htmlFor="name">Name</label>
        					<input 
        						className="pa2 input-reset white ba bg-transparent w-100 measure"
        						type="text" 
        						name="name"  
        						id="name"
        						onChange={this.onNameChange}
        					/>
      					</div>
      					<div className="mt3">
        					<label className="db fw4 lh-copy f4" htmlFor="email-address">Email address</label>
        					<input 
        						className="pa2 input-reset white ba bg-transparent w-100 measure" 
        						type="email" 
        						name="email-address"  
        						id="email-address"
        						onChange={this.onEmailChange}
        					/>
      					</div>
      					<div className="mt3">
        					<label className="db fw4 lh-copy f4" htmlFor="password">Password</label>
        					<input 
        						className="b pa2 input-reset white ba bg-transparent" 
        						type="password" 
        						name="password"  
        						id="password"
        						onChange={this.onPasswordChange}
        					/>
      					</div>
    				</fieldset>
    				<div className="mt2 mb2">
    					<input
    						onClick={this.onSubmitSignIn} 
    						className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" 
    						type="submit" 
    						value="Register"
    					/>
    				</div>
  				</main>
			</article>
		);
	}
}

export default Register;