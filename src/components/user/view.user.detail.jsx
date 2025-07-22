import { Button, Drawer } from "antd";
import { useState } from "react";

const ViewUserDetail = (props) => {
    const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail } = props;
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
    console.log(">>> check file:", preview);


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

                <div style={{ marginTop: '10px', height: '100px', width: '150px' }}>
                    <img style={{ height: '100%', width: '100%', objectFit: 'contain' }}
                        src={preview} />
                </div>
            </> :
                <><p>Không có dữ liệu...</p></>
            }

        </Drawer>
    )
}

export default ViewUserDetail;