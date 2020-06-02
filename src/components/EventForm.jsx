import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import axios from "axios";

class EventForm extends Component {
   state = {
      formData: {
         ename: "",
         ecreator: "",
         edatetime: "",
         evenue: "",
         eaudience: [],
         estate: "",
      },
   };

   handleChange = (e) => {
      const newFormData = this.state.formData;
      newFormData[e.target.name] = e.target.value;
      this.setState({ formData: newFormData });
   };

   handleChangeMultiple = (e) => {
      const newFormData = this.state.formData;
      newFormData[e.target.name] = Array.from(e.target.selectedOptions, (option) => option.value);
      this.setState({ formData: newFormData });
   };

   handleSubmit = (item) => {
      console.log(this.state.formData);
      var formData = new FormData();
      formData.append("name", this.state.formData.ename);
      formData.append("datetime", this.state.formData.edatetime);
      formData.append("venue", this.state.formData.evenue);
      formData.append("creator", this.state.formData.ecreator);
      formData.append("audience", this.state.formData.eaudience);
      formData.append("state", this.state.formData.estate.toLowerCase());
      axios({
         method: "POST",
         url: "/api/events/new/",
         data: formData,
         headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Token " + localStorage.getItem("token"),
         },
      })
         .then((response) => {
            console.log(response);
         })
         .catch((error) => {
            console.log(error);
         });
   };

   render() {
      return (
         <Form>
            <FormGroup>
               <Label for="ename"> Name </Label>
               <Input
                  type="text"
                  name="ename"
                  value={this.state.formData.ename}
                  onChange={this.handleChange}
               />
            </FormGroup>
            <FormGroup>
               <Label for="edatetime"> DateTime </Label>
               <Input
                  type="text"
                  name="edatetime"
                  value={this.state.formData.edatetime}
                  onChange={this.handleChange}
               />
            </FormGroup>
            <FormGroup>
               <Label for="evenue"> Venue </Label>
               <Input
                  type="textarea"
                  name="evenue"
                  value={this.state.formData.evenue}
                  onChange={this.handleChange}
               />
            </FormGroup>
            <FormGroup>
               <Label for="eaudience"> Audience </Label>
               <Input
                  type="select"
                  name="eaudience"
                  value={this.state.formData.eaudience}
                  onChange={this.handleChangeMultiple}
                  multiple
               >
                  <option> UG 1 </option>
                  <option> UG 2 </option>
                  <option> UG 3 </option>
                  <option> UG 4+ </option>
                  <option> PG </option>
                  <option> Staff </option>
                  <option> Faculty </option>
               </Input>
            </FormGroup>
            <FormGroup>
               <Label for="ecreator"> Creator </Label>
               <Input
                  type="text"
                  name="ecreator"
                  value={this.state.formData.ecreator}
                  onChange={this.handleChange}
               />
            </FormGroup>
            <FormGroup>
               <Label for="estate"> State </Label>
               <Input
                  type="select"
                  name="estate"
                  value={this.state.formData.estate}
                  onChange={this.handleChange}
               >
                  <option> CREATED </option>
                  <option> APPROVED </option>
                  <option> PUBLISHED </option>
                  <option> SCHEDULED </option>
                  <option> COMPLETED </option>
                  <option> DELETED </option>
               </Input>
            </FormGroup>
            <Button type="button" onClick={this.handleSubmit}>
               Submit
            </Button>
         </Form>
      );
   }
}

export default EventForm;
