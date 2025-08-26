import { Input, notification, Button, Modal, InputNumber, Select } from 'antd';
import { useState } from 'react';
import { handleUploadFile, createBookAPI } from '../../services/api.service';

const BookForm = (props) => {
    // VARIABLES
    const { loadBook, isModalOpen, setIsModalOpen } = props;
    const [mainText, setMainText] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    // FUNCTIONS
    /**
     * Handles the submission of the book creation form.
     * - Uploads the book thumbnail.
     * - Calls the API to create a new book with the provided details.
     * - Shows a success notification and reloads the book list on success.
     * - Shows an error notification on failure.
     *
     * @async
     * @function handleSubmitBtn
     * @returns {Promise<void>} Resolves when the submission process is complete.
     */
    const handleSubmitBtn = async () => {
        const uploadedThumbnail = await handleUpdateThumbnail();
        const res = await createBookAPI(mainText, author, price, quantity, category, uploadedThumbnail);
        if (res.data) {
            notification.success({
                message: 'Success',
                description: 'Create book successfully!'
            });
            // After creating book successfully, re-load book list and reset/ close modal
            await loadBook();
            resetAndCloseModal();
        } else {
            notification.error({
                message: 'Error',
                description: JSON.stringify(res.message || 'Failed to create book')
            });
        }
    }

    /**
     * Handles the upload of a selected thumbnail file for a book.
     * 
     * This function uploads the selected file using the `handleUploadFile` API,
     * and returns the uploaded file information if successful.
     * If the upload fails, it displays an error notification.
     *
     * @async
     * @function handleUpdateThumbnail
     * @returns {Promise<Object|undefined>} Returns the uploaded file information (`fileUploaded`) if successful, otherwise `undefined`.
     */
    const handleUpdateThumbnail = async () => {
        /**
         * Assign the value to the variable
         * Can't use useState because it's async function 
         * if we use useState, the value will be updated in the next render
         * --> https://stackoverflow.com/questions/54069253/react-usestate-hook-not-updating-immediately
         * thumbnail is required in createBookAPI, so if not get the value (or delay), we can't create book
         */
        const resUpload = await handleUploadFile(selectedFile, 'book');

        if (resUpload.data) {
            return (resUpload.data.fileUploaded); // fileUploaded is the key that response from backend
        } else {
            notification.error({
                message: 'Error',
                description: JSON.stringify(resUpload.message || 'Failed to upload file')
            });
            return;
        }
    }


    /**
     * Resets all form fields and closes the modal dialog.
     * Clears main text, author, price, quantity, category, selected file, and preview state.
     * Also sets the modal open state to false.
     */
    const resetAndCloseModal = () => {
        setMainText('');
        setAuthor('');
        setPrice('');
        setQuantity('');
        setCategory('');
        setSelectedFile(null);
        setPreview(null);
        setIsModalOpen(false);
    }

    /**
     * Handles the change event for a file input element.
     * Sets the selected file and generates a preview URL for the first file selected.
     * If no file is selected, clears the selected file and preview.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the file input.
     */
    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }
        // I've kept this example simple by using the first image instead of multiple
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file))
        }
    }

    return (
        <div className="user-form" style={{ margin: '20px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>Table Books</h3>
                    <Button
                        type="primary"
                        onClick={() => setIsModalOpen(true)}
                    >Create Book</Button>
                </div>
            </div>

            <Modal
                title="Create Book"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen} // Control the visibility of the modal
                onOk={() => handleSubmitBtn()} // Action when click "Create" button
                onCancel={() => resetAndCloseModal()} // Action when click "X" button or outside the modal
                maskClosable={false} // Prevent closing by clicking outside the modal
                okText="Create"
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <span>Title</span>
                        <Input
                            value={mainText}
                            onChange={(e) => { setMainText(e.target.value) }} />
                    </div>
                    <div>
                        <span>Author</span>
                        <Input
                            value={author}
                            onChange={(e) => { setAuthor(e.target.value) }} />
                    </div>
                    <div>
                        <div>Price</div>
                        <InputNumber
                            addonAfter="đ"
                            style={{ width: '100%' }}
                            value={price}
                            onChange={(value) => {
                                setPrice(value);
                            }}
                        />
                    </div>
                    <div>
                        <span>Quantity</span>
                        <Input
                            value={quantity}
                            onChange={(e) => {
                                setQuantity(e.target.value)
                            }}
                        />
                    </div>
                    <div>
                        <div>Category</div>
                        <Select
                            style={{ width: '100%' }}
                            onChange={(value) => { setCategory(value); }}
                            placeholder="Select a category"
                            options={[
                                { value: 'Arts', label: 'Arts' },
                                { value: 'Business', label: 'Business' },
                                { value: 'Comics', label: 'Comics' },
                                { value: 'Cooking', label: 'Cooking' },
                                { value: 'Entertainment', label: 'Entertainment' },
                                { value: 'History', label: 'History' },
                                { value: 'Music', label: 'Music' },
                                { value: 'Sports', label: 'Sports' },
                                { value: 'Teen', label: 'Teen' },
                                { value: 'Travel', label: 'Travel' },
                            ]}
                        />
                    </div>
                    <div>
                        <div>Thumbnail</div>
                        <div>
                            <label htmlFor='btnUpload' style={{
                                display: "block",
                                width: "fit-content",
                                marginTop: "15px",
                                padding: "5px 10px",
                                background: "orange",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}>
                                Upload
                            </label>
                            <input
                                type='file' hidden id='btnUpload'
                                onChange={(event) => handleOnChangeFile(event)}
                                onClick={(event) => event.target.value = null}
                            />
                        </div>
                        {preview &&
                            <>
                                <div style={{
                                    marginTop: "10px",
                                    marginBottom: "15px",
                                    height: "100px", width: "150px",
                                }}>
                                    <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                        src={preview} />
                                </div>
                            </>
                        }
                    </div>
                </div >
            </Modal >
        </div >
    );
}

export default BookForm;