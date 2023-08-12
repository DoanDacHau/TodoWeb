import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NewCategory = () => {


  const [nameCate, setNameCate] = useState('');
  const [colorCategory, setColorCategory] = useState('rgb(0, 64, 255)');

  const navigate = useNavigate();

  const createCategory = () => {
    if (JSON.parse(localStorage.getItem('USER')) && nameCate !== '') {
      const data = {
        name: nameCate,
        color: colorCategory,
        icon: 'fas fa-bars',
        user_id: JSON.parse(localStorage.getItem('USER')).data.user_id
      }
      const option = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
      }
      fetch('http://localhost:5000/api/v1/categories', option)
        .then(res => res.json())
        .then((data) => {
          if (data !== null) {
            alert('Them category thanh cong');
            window.location.reload();
          }
        })
    } else if (!JSON.parse(localStorage.getItem('USER'))) {
      navigate('/api/v1/auth')
    } else if (nameCate === '') {
      alert('Hay nhap ten');
    }
  }


  const closeModalCategory = () => {
    const modal = document.querySelector('.modal-category');
    modal.classList.remove('open');
  }

  return (
    <>
      <div className='modal-category'>
        <div className='modal-container-category'>
          <div className="modal-category-title">
            <h5>Create new reminder</h5>
          </div>
          <div className='icon-space' style={{ backgroundColor: `${colorCategory}` }}>
            <div className='icon'>
              <i class="fas fa-bars"></i>
            </div>
          </div>
          <div className="input">
            <input id="contact" type="text" className="form-control" placeholder='Name cate' value={nameCate} onChange={(e) => setNameCate(e.target.value)} />
          </div>
          <div className='list-color'>
            <button style={{ backgroundColor: 'rgb(255, 0, 60)' }} className={colorCategory === 'rgb(255, 0, 60)' ? 'color active-color' : 'color'} onClick={() => setColorCategory('rgb(255, 0, 60)')}></button>
            <button style={{ backgroundColor: 'orange' }} className={colorCategory === 'orange' ? 'color active-color' : 'color'} onClick={() => setColorCategory('orange')}></button>
            <button style={{ backgroundColor: 'greenyellow' }} className={colorCategory === 'greenyellow' ? 'color active-color' : 'color'} onClick={() => setColorCategory('greenyellow')}></button>
            <button style={{ backgroundColor: 'rgb(0, 64, 255)' }} className={colorCategory === 'rgb(0, 64, 255)' ? 'color active-color' : 'color'} onClick={() => setColorCategory('rgb(0, 64, 255)')}></button>
            <button style={{ backgroundColor: 'plum' }} className={colorCategory === 'plum' ? 'color active-color' : 'color'} onClick={() => setColorCategory('plum')}></button>
            <button style={{ backgroundColor: 'burlywood' }} className={colorCategory === 'burlywood' ? 'color active-color' : 'color'} onClick={() => setColorCategory('burlywood')}></button>
          </div>
          <div className="button">
            <button className="btn-cancel" onClick={closeModalCategory} >Cancel</button>
            <button style={{ marginLeft: "6px" }} className="btn btn-primary" onClick={createCategory}>Create</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewCategory;