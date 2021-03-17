import React, { Component } from "react";
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'


const URL = 'http://localhost:3003/api/todo'

export default class Todo extends Component {

    constructor(props) {
        super(props)
        this.state = { description: '', list:[] }

        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)

        this.refresh()
    }

    refresh() {
        axios.get(`${URL}?sort=-createAt`).then(resp=>{
            this.setState({...this.state, description: '', list:resp.data})
        })
    }

    handleChange(e) {
        this.setState({...this.state, description: e.target.value})
    }

    handleAdd() {
        const description = this.state.description
        axios.post(URL, {description}).then(resp =>{
            this.refresh()
        })
        console.log('teste')
    }

    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='cadastro'/>
                <TodoForm description={this.state.description} 
                    handleAdd={this.handleAdd}
                    handleChange={this.handleChange}/>
                <TodoList list={this.state.list}></TodoList>
            </div>
        )
    }
}