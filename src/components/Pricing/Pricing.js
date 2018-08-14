import React, {Component }from 'react';
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import {connect} from 'react-redux'
import {getUser} from '../../ducks/reducer'

class Pricing extends Component {
    constructor(){
        super()

        this.state = {
            hair:'',
            chemicaltreatment:'',
            lashes:''
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    componentDidMount(){
        axios.get('/api/getpricing').then((res) => {
            this.setState({
                hair: res.data[0].hair,
                chemicaltreatment: res.data[0].chemical_treatment,
                lashes: res.data[0].lashes
            })
        })
    }
    editProducts(){
        let body = {
            hair: this.state.hair,
            chemicaltreatment: this.state.chemicaltreatment,
            lashes: this.state.lashes
        }
        let id = 1
        axios.put(`/api/editpricing/${id}`, body).then(() => {
            alert('Success!')
        })
    }
    render(){
        return (
            <div>
                <Navbar/>
            {this.props.user.admin ? 
                <div className = 'reset'>
                    <div className = 'productsinputtitle'>Hair</div>
                    <textarea type='text' className='productsinput' name = 'hair'value = {this.state.hair} placeholder = 'Hair' onChange = {this.handleChange}/>
                    <div className = 'productsinputtitle'>Chemical Treatment</div>
                    <textarea type='text' className='productsinput' name = 'chemicaltreatment'value = {this.state.chemicaltreatment} placeholder = 'Chemical Treatment' onChange = {this.handleChange}/>
                    <div className = 'productsinputtitle'>Lashes</div>
                    <textarea type='text' className='productsinput' name = 'lashes'value = {this.state.lashes} placeholder = 'Lashes' onChange = {this.handleChange}/>
                    <button className='button' onClick = {() => {this.editProducts()}}>Upload</button>
                </div>  
            :  
                <div className = 'reset'>
                    <div className = 'productsinputtitle'>Hair</div>
                    <textarea disabled type='text' className='productsinput' value = {this.state.hair}/>
                    <div className = 'productsinputtitle'>Chemical Treatment</div>
                    <textarea disabled type='text' className='productsinput' value = {this.state.chemicaltreatment}/>
                    <div className = 'productsinputtitle'>Lashes</div>
                    <textarea disabled type='text' className='productsinput' value = {this.state.lashes}/>
                </div>
            }
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
      user: state.user
    }
  }
  
  export default connect(mapStateToProps,{getUser})(Pricing)