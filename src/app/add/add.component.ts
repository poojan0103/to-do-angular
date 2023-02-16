// import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { todoObj } from '../interface/todo';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  todoObj : todoObj;
  constructor(private router:Router, private route:ActivatedRoute) { 
    this.todoObj = new todoObj();
    this.route.params.subscribe((res)=>{
      this.todoObj.Id = res['id']
    })
  }

  ngOnInit(): void {
    const oldRecords = localStorage.getItem('todoList');
    if(oldRecords !== null){
      const todoList= JSON.parse(oldRecords)
      const current = todoList.find((m:any)=> m.Id == this.todoObj.Id)
      if(current !== undefined){
        this.todoObj.Title = current.Title;
        this.todoObj.Description = current.Description;
        this.todoObj.Startdate = current.Startdate;
        this.todoObj.Enddate = current.Enddate;
        this.todoObj.Status = current.Status;
        
        
      }
    }
  }
  getId(){
    const oldRecords = localStorage.getItem('todoList');
    if(oldRecords !== null){
      const todoList = JSON.parse(oldRecords);
      return todoList.length+1;
    }else{
      return 1;
    }
    
  }
  saveItem(){
    const latestId = this.getId();
    this.todoObj.Id = latestId;
    const oldRecords = localStorage.getItem('todoList');
    if(oldRecords !== null){
      const todoList = JSON.parse(oldRecords);
      todoList.push(this.todoObj);
      localStorage.setItem('todoList',JSON.stringify(todoList))
    }else{
      const todoArr = [];
      todoArr.push(this.todoObj);
      localStorage.setItem('todoList',JSON.stringify(todoArr))
    }
    this.router.navigateByUrl('/list')
  }
  updateItem(){
    const oldRecords = localStorage.getItem('todoList');
    if(oldRecords !== null){
      const todoList = JSON.parse(oldRecords);
      todoList.splice(todoList.findIndex((a:any)=> a.Id == this.todoObj.Id),1)
      todoList.push(this.todoObj);
      localStorage.setItem('todoList',JSON.stringify(todoList));
    }
    this.router.navigateByUrl('/list')

  }


}
