import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Popconfirm } from 'antd';
import BookForm from './book.form';
import ViewBookDetail from './view.book.detail';
import { useState } from 'react';

const BookTable = (props) => {
    const { dataBook, loadBook, current, pageSize, total, setCurrent, setPageSize } = props;

    // Drawer state and data to control detail visibility
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [dataDetail, setDataDetail] = useState();

    // Modal state to control form visibility
    const [isModalOpen, setIsModalOpen] = useState(false);


    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => {
                return (
                    <>
                        <span>{(index + 1) + (current - 1) * pageSize}</span>
                    </>
                )
            }
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return <a
                    onClick={() => {
                        setDataDetail(record);
                        setIsDetailOpen(true);
                    }}
                >{record._id}</a>;
            }
        },
        {
            title: 'Title',
            dataIndex: 'mainText',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (text, record, index, action) => {
                if (text) {
                    return formatter.format(record.price);
                }
            }
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Author',
            dataIndex: 'author',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => {
                return (
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <EditOutlined
                            style={{ cursor: "pointer", color: "orange" }}
                            onClick={() => {
                                alert('Not implemented edit function yet');
                            }} />
                        <Popconfirm
                            placement="left"
                            title="Delete Book"
                            description="Do you really want to delete this book?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => alert('Not implemented delete function yet')}
                        >
                            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                        </Popconfirm>
                    </div>
                )
            },
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        // Update table based on current page
        if (pagination && pagination.current) {
            if (pagination.current !== +current) {
                setCurrent(+pagination.current); // Add '+' to convert string to number '5' -> 5
            }
        }
        // Update table size based on page size
        if (pagination && pagination.pageSize) {
            if (pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize); // Add '+' to convert string to number '5' -> 5
            }
        }
    }

    return (
        <>
            <BookForm
                loadBook={loadBook}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
            <Table
                columns={columns}
                dataSource={dataBook}
                rowKey="_id"
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }}
                onChange={onChange}
            />
            <ViewBookDetail
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                formatter={formatter}
            />
        </>
    );
};

export default BookTable;