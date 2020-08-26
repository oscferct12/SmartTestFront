import React, { useContext, useState, useMemo } from 'react';
import { Panel } from 'primereact/panel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { PersonContext } from "../contexts/PersonContext";
import PersonForm from './PersonForm';
import PersonDetail from './PersonDetail';



const PersonList = () => {

    const initialPersonState = {
        id: null,
        name: "",
        age: 0,
        personTypeId: 0
    };

    const { persons, findPerson, personTypes, deletePerson, editPerson } = useContext(PersonContext);
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleDetails, setIsVisibleDetails] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(initialPersonState);

    const savePerson = (id) => {
        findPerson(id);
        setIsVisible(true);
    };

    const _deletePerson = (id) => {
        setIsVisible(false);        
        deletePerson(id);
        setIsVisible(null); 
    };

    const footer = (
        <div className="p-clearfix" style={{ width: "100%" }}>
            <Button style={{ float: "left" }}
                icon="pi pi-plus"
                label="Add New Person"
                onClick={() => setIsVisible(true)}
            ></Button>
        </div>
    );

    const showDetails = (person) => {
        setSelectedPerson(person)   
        setIsVisibleDetails(true);     
    };

    const actionsTemplate = (rowdata) => {
        
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-primary p-mr-2" onClick={() => savePerson(rowdata.id)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => _deletePerson(rowdata.id)} />
                {rowdata.personTypeId === "Teacher" ? <Button icon="pi pi-chart-bar" className="p-button-rounded p-button-submit" onClick={() => showDetails(rowdata)} /> : <div>
                </div>}
            </>
        )
    }


    const personstable = useMemo(() => {
        let personarray = []
        if (personTypes && personTypes.length > 0 && persons) {
            personarray = persons.map(item => {
                return ({
                    ...item,
                    personTypeId: personTypes.find(x => x.id === item.personTypeId).description
                }
                )
            });
        }
        return personarray;
    }, [persons, personTypes]);
    return (

        <div>
            <Panel header="Person List" style={{ textAlign: "center" }}>
                {!personstable ? <h2>Loading...</h2>
                    : (
                        <DataTable
                            value={personstable}
                            selectionMode="single"
                            footer={footer}>

                            <Column field="id" header="Id" sortable></Column>
                            <Column field="name" header="Name" sortable></Column>
                            <Column field="age" header="Age" sortable></Column>
                            <Column field={"personTypeId"} header="Person Type" sortable></Column>
                            <Column body={actionsTemplate} header="Actions" />
                        </DataTable>
                    )
                }
            </Panel>
            <PersonForm isVisible={isVisible} setIsVisible={setIsVisible}></PersonForm>
            <PersonDetail isVisibleDetails={isVisibleDetails} setIsVisibleDetails={setIsVisibleDetails} selectedPerson={selectedPerson}></PersonDetail>
        </div>
    );
}


export default PersonList;