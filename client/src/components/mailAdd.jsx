import { useState } from "react";

const MailEdit = ({ mail }) => {
    const [currentMail, setCurrentMail] = useState(mail);

    // Get current date and time
    const getCurrentDate = () => {
        const now = new Date();
        return now.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    };

    const getCurrentTime = () => {
        const now = new Date();
        return now.toTimeString().slice(0, 5); // Format as HH:mm
    };

    const handleInputChange = (e, key, subKey) => {
        const value = e.target.value;
        setCurrentMail((prevMail) => {
            if (subKey) {
                return {
                    ...prevMail,
                    [key]: {
                        ...prevMail[key],
                        [subKey]: value,
                    },
                };
            }
            return {
                ...prevMail,
                [key]: value,
            };
        });
    };

    // Ensure receive date/time is at least 30 minutes after send date/time
    const computeMinReceiveDateTime = () => {
        const sendDateTime = new Date(`${currentMail.sendDate.date}T${currentMail.sendDate.time}`);
        const minReceiveDateTime = new Date(sendDateTime.getTime() + 30 * 60000); // Add 30 minutes
        return {
            date: minReceiveDateTime.toISOString().split("T")[0],
            time: minReceiveDateTime.toTimeString().slice(0, 5),
        };
    };

    const minReceiveDateTime = computeMinReceiveDateTime();

    return (
        <dialog id={"editMailModal" + currentMail.mailId} className="modal">
            <div className="modal-box md:p-12">
                <h3 className="font-bold text-2xl mb-6">
                    Modifier le courrier
                    <span className={"badge badge-outline ml-3"}>
                        id: {currentMail.mailId}
                    </span>
                </h3>

                {/* Subject */}
                <label className="form-control w-full mb-3">
                    <div className="label">
                        <span className="label-text">Sujet</span>
                    </div>
                    <input
                        type="text"
                        value={currentMail.subject}
                        onChange={(e) => handleInputChange(e, "subject")}
                        className="input input-sm input-bordered w-full"
                    />
                </label>

                <div className={"w-full h-full flex flex-col gap-3"}>
                    {/* Sender and Receiver Details */}
                    <div className="w-full flex gap-6">
                        {/* Sender */}
                        <div className={"flex flex-col gap-3 w-1/2"}>
                            {/* Sender Inputs */}
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Nom de l'expéditeur</span>
                                </div>
                                <input
                                    type="text"
                                    value={currentMail.sender.name}
                                    onChange={(e) => handleInputChange(e, "sender", "name")}
                                    className="input input-sm input-bordered w-full max-w-xs"
                                />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Adresse de l'expéditeur</span>
                                </div>
                                <input
                                    type="text"
                                    value={currentMail.sender.address}
                                    onChange={(e) => handleInputChange(e, "sender", "address")}
                                    className="input input-sm input-bordered w-full max-w-xs"
                                />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Contact de l'expéditeur</span>
                                </div>
                                <input
                                    type="text"
                                    value={currentMail.sender.phoneNumber}
                                    onChange={(e) => handleInputChange(e, "sender", "phoneNumber")}
                                    className="input input-sm input-bordered w-full max-w-xs"
                                />
                            </label>
                        </div>

                        {/* Receiver */}
                        <div className={"flex flex-col gap-3 w-1/2"}>
                            {/* Receiver Inputs */}
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Nom du destinataire</span>
                                </div>
                                <input
                                    type="text"
                                    value={currentMail.receiver.name}
                                    onChange={(e) => handleInputChange(e, "receiver", "name")}
                                    className="input input-sm input-bordered w-full max-w-xs"
                                />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Adresse du destinataire</span>
                                </div>
                                <input
                                    type="text"
                                    value={currentMail.receiver.address}
                                    onChange={(e) => handleInputChange(e, "receiver", "address")}
                                    className="input input-sm input-bordered w-full max-w-xs"
                                />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Contact du destinataire</span>
                                </div>
                                <input
                                    type="text"
                                    value={currentMail.receiver.phoneNumber}
                                    onChange={(e) => handleInputChange(e, "receiver", "phoneNumber")}
                                    className="input input-sm input-bordered w-full max-w-xs"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Dates and Times */}
                    <div className={"flex flex-col gap-3"}>
                        {/* Send Date and Time */}
                        <div className={"flex flex-col"}>
                            <div className="label">
                                <span className="label-text">Date et heure d'envoi</span>
                            </div>
                            <div className={"flex items-center gap-2"}>
                                <input
                                    type="date"
                                    value={currentMail.sendDate.date}
                                    min={getCurrentDate()}
                                    onChange={(e) => handleInputChange(e, "sendDate", "date")}
                                    className="input input-sm input-bordered w-full h-full"
                                />
                                <input
                                    type="time"
                                    value={currentMail.sendDate.time}
                                    min={currentMail.sendDate.date === getCurrentDate() ? getCurrentTime() : "00:00"}
                                    onChange={(e) => handleInputChange(e, "sendDate", "time")}
                                    className="input input-sm input-bordered w-full h-full"
                                />
                            </div>
                        </div>

                        {/* Receive Date and Time */}
                        <div className={"flex flex-col"}>
                            <div className="label">
                                <span className="label-text">Date et heure prévues de réception</span>
                            </div>
                            <div className={"flex items-center gap-2"}>
                                <input
                                    type="date"
                                    value={currentMail.receiveDate.date}
                                    min={minReceiveDateTime.date}
                                    onChange={(e) => handleInputChange(e, "receiveDate", "date")}
                                    className="input input-sm input-bordered w-full h-full"
                                />
                                <input
                                    type="time"
                                    value={currentMail.receiveDate.time}
                                    min={
                                        currentMail.receiveDate.date === minReceiveDateTime.date
                                            ? minReceiveDateTime.time
                                            : "00:00"
                                    }
                                    onChange={(e) => handleInputChange(e, "receiveDate", "time")}
                                    className="input input-sm input-bordered w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status */}
                <div className="label">
                    <span className="label-text">Statut</span>
                </div>
                <select
                    value={currentMail.status}
                    onChange={(e) => handleInputChange(e, "status")}
                    className="select select-bordered select-sm w-full"
                >
                    <option value="delivered">Livré</option>
                    <option value="in transit">En transit</option>
                    <option value="pending">En attente</option>
                    <option value="returned">Retourné</option>
                </select>

                {/* Actions */}
                <div className="modal-action">
                    <button className="btn btn-sm btn-primary">Modifier</button>
                    <button className="btn btn-outline btn-sm btn-default ml-2">Annuler</button>
                </div>
            </div>
        </dialog>
    );
};

export default MailEdit;
