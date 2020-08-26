import React, { useContext, useState, useEffect } from 'react';
import { PersonContext } from '../contexts/PersonContext';
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";


const PersonForm = (props) => {

    const { isVisible, setIsVisible } = props;

    const {
        createPerson,
        updatePerson,
        editPerson,
        personTypes
    } = useContext(PersonContext)

    const initialPersonState = {
        id: null,
        name: "",
        age: 0,
        personTypeId:  0
    };


    const [personData, setPersonData] = useState(initialPersonState);



    useEffect(() => {
        if (editPerson) setPersonData(editPerson);
    }, [editPerson]);


    const updateField = (data, field) => {
        setPersonData({
            ...personData,
            [field]: data,
        });
    };

    const savePerson = () => {
          debugger
        if (editPerson == null) {
            if (personData.personTypeId !== null && personData.personTypeId !==0) {
                createPerson(personData);
            }
        } else {
            updatePerson(personData);
        }
        setPersonData(initialPersonState);
        setIsVisible(false);
    };

    const dialogFooter =
        <div className="ui-dialog-buttonpane p-clearfix">
            <Button label={personData.id != null ? "Edit" : "Save"} icon="pi pi-check" onClick={savePerson} />
        </div>

    const clearSelected = () => {
        setIsVisible(false);
        setPersonData(initialPersonState);
    };

    return (

        <div>
            <Dialog
                visible={isVisible}
                modal={true}
                style={{ width: "420px" }}
                contentStyle={{ overflow: "visible" }}
                header="Person Details"
                onHide={() => clearSelected()}
                footer={dialogFooter}
            >
                <div className="p-grid p-fluid">
                    <br />
                    <div className="p-float-label">
                        <InputText
                            value={personData.name}
                            onChange={(e) => updateField(e.target.value.trim(), "name")}
                        />
                        <label>Name:</label>
                    </div>
                    <br />
                    <div className="p-float-label">
                        <InputText
                            value={personData.age}
                            onChange={(e) => updateField(e.target.value.trim(), "age")}
                        />
                        <label>Age:</label>
                    </div>
                    <br />
                    <br />
                    <div className="p-float-label">
                        {/* <InputText
                            value={personData.personTypeId}
                            onChange={(e) => updateField(e.target.value.trim(), "personTypeId")}
                        /> */}
                        <Dropdown optionLabel="description" optionValue="id" value={personData.personTypeId} options={personTypes} onChange={(e) => updateField(e.target.value, "personTypeId")} placeholder="Select a Person Type" />
                    </div>
                    <br />
                </div>
            </Dialog>

        </div>);
}

export default PersonForm;