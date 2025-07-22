import { Button, Drawer } from "antd";

const ViewUserDetail = (props) => {
    const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail } = props;

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
                <div>
                    <img height={"100"} width={"150"} src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} />
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
                    <input type="file" id="btnUpload" hidden />
                </div>
            </> :
                <><p>Không có dữ liệu...</p></>
            }

        </Drawer>
    )
}

export default ViewUserDetail;