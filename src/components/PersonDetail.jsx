import React from 'react';
import { Dialog } from "primereact/dialog";
import { Chart } from 'primereact/chart';


const PersonDetail = (props) => {

    const { isVisibleDetails, setIsVisibleDetails, selectedPerson } = props;


    const close = () => {
        setIsVisibleDetails(false);
    };

    const basicData = {
        labels: Array.from({ length: 10 }, () => new Date(new Date('2020-02-12T01:57:45.271Z').getTime() + Math.random() * (new Date('2021-02-12T01:57:45.271Z').getTime() - new Date('2020-02-12T01:57:45.271Z').getTime())).toLocaleDateString()),
        datasets: [
            {
                label: selectedPerson.name,
                backgroundColor: '#42A5F5',
                data: Array.from({ length: 1000 }, () => Math.floor(Math.random() * 100))
            }
        ]
    };

    return (

        <div>
            <Dialog
                visible={isVisibleDetails}
                modal={true}
                style={{ width: "620px" }}
                contentStyle={{ overflow: "visible" }}
                header={`${selectedPerson.name}  ${selectedPerson.age} ${selectedPerson.personTypeId}`}
                onHide={() => close()}
            >
                <Chart type="bar" data={basicData} />
            </Dialog>

        </div>);
}

export default PersonDetail;