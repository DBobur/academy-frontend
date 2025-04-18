import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const ContractFormPage = () => {
    const { id } = useParams() // agar mavjud bo‘lsa → edit mode
    const navigate = useNavigate()
    const [form, setForm] = useState({
        userId: '',
        contractTy: 'WORK',
        startDate: '',
        endDate: '',
        status: 'ACTIVE',
        contractDetails: ''
    })

    const isEdit = Boolean(id)

    useEffect(() => {
        if (isEdit) {
            const token = localStorage.getItem('accessToken')
            axios.get(`http://localhost:8080/api/v1/contracts/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => setForm(res.data))
                .catch(err => console.error('Error loading contract:', err))
        }
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('accessToken')
            const url = isEdit
                ? `http://localhost:8080/api/v1/contracts/${id}`
                : `http://localhost:8080/api/v1/contracts`

            const method = isEdit ? 'put' : 'post'

            await axios[method](url, form, {
                headers: { Authorization: `Bearer ${token}` }
            })

            alert(`Contract ${isEdit ? 'updated' : 'created'} successfully!`)
            navigate('/contracts')
        } catch (err) {
            console.error(err)
            alert('Operation failed')
        }
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2>{isEdit ? 'Edit Contract' : 'Create New Contract'}</h2>
            <form onSubmit={handleSubmit}>
                <label>User ID:</label><br />
                <input type="number" name="userId" value={form.userId} onChange={handleChange} required /><br /><br />

                <label>Contract Type:</label><br />
                <select name="contractTy" value={form.contractTy} onChange={handleChange}>
                    <option value="WORK">WORK</option>
                    <option value="STUDY">STUDY</option>
                    <option value="SCHOLARSHIP">SCHOLARSHIP</option>
                    <option value="OTHER">OTHER</option>
                </select><br /><br />

                <label>Start Date:</label><br />
                <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required /><br /><br />

                <label>End Date:</label><br />
                <input type="date" name="endDate" value={form.endDate} onChange={handleChange} required /><br /><br />

                <label>Status:</label><br />
                <select name="status" value={form.status} onChange={handleChange}>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                    <option value="CANCELLED">CANCELLED</option>
                    <option value="EXPIRED">EXPIRED</option>
                </select><br /><br />

                <label>Details:</label><br />
                <textarea name="contractDetails" value={form.contractDetails} onChange={handleChange} rows={4} /><br /><br />

                <button type="submit">{isEdit ? 'Update' : 'Create'} Contract</button>
            </form>
        </div>
    )
}

export default ContractFormPage
