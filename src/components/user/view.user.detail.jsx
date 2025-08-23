import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import { handleUploadFile } from "../../services/api.service";
import { updateUserAvatarAPI } from "../../services/api.service";

const ViewUserDetail = (props) => {
    const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail, loadUser } = props;
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            return
        }
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    const handleUpdateAvatar = async () => {
        // Step 1: upload file
        const resUpload = await handleUploadFile(selectedFile, 'avatar');
        if (resUpload.data) {
            const newAvatar = resUpload.data.fileUploaded; // fileUploaded is the key that response from backend
            const resUpdateAvatar = await updateUserAvatarAPI(newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone);
            if (resUpdateAvatar.data) {
                setIsDetailOpen(false); // Close the drawer
                setDataDetail(null); // Clear the dataDetail
                setSelectedFile(null); // Clear the selected file
                await loadUser(); // Reload user data

                notification.success({
                    message: 'Success',
                    description: 'Update avatar successfully!'
                });
                3
            } else {
                notification.error({
                    message: 'Error',
                    description: JSON.stringify(resUpdateAvatar.message || 'Failed to update avatar')
                });
            }
        } else {
            notification.error({
                message: 'Error',
                description: JSON.stringify(resUpload.message || 'Failed to upload file')
            });
            return;
        }
        // Step 2: call API to update user avatar
    }

    return (
        <Drawer
            width={"40vw"}
            title="Detail User"
            closable={{ 'aria-label': 'Close Button' }}
            onClose={() => {
                setDataDetail(null);
                setIsDetailOpen(false);
            }}
            open={isDetailOpen}
        >
            {dataDetail ? <>
                <p>Id: {dataDetail._id}</p>
                <br />
                <p>Full name: {dataDetail.fullName}</p>
                <br />
                <p>Email: {dataDetail.email}</p>
                <br />
                <p>Phone: {dataDetail.phone}</p>
                <br />
                <p>Avatar:</p>
                <div style={{ marginTop: '10px', height: '100px', width: '150px', border: '1px solid #ccc' }}>
                    <img style={{ height: '100%', width: '100%', objectFit: 'contain' }}
                        src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} />
                </div>
                <div>
                    <label
                        htmlFor="btnUpload"
                        style={{
                            display: 'block',
                            width: 'fit-content',
                            marginTop: '15px',
                            padding: '5px 10px',
                            background: 'orange',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}>
                        Upload Avatar</label>
                    <input type="file" id="btnUpload" hidden onChange={(event) => { handleOnChangeFile(event) }} />
                </div>
                {preview &&
                    <>
                        <div style={{ marginTop: '10px', marginBottom: '15px', height: '100px', width: '150px' }}>
                            <img style={{ height: '100%', width: '100%', objectFit: 'contain' }}
                                src={preview} />
                        </div>
                        <Button type="primary"
                            onClick={() => { handleUpdateAvatar() }}
                        >Save</Button>
                    </>
                }

            </> :
                <><p>Không có dữ liệu...</p></>
            }
        </Drawer>
    )
}

export default ViewUserDetail;