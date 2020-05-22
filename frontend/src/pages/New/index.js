import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';

import './styles.css';

export default function New({ history }) {
    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrices] = useState('');

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData();
        const user_Id = localStorage.getItem('user')

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: { user_Id }
        });

        history.push('/dashboard')
    }

    return (
        <form onSubmit={handleSubmit}>
            <label 
            id="thumbnail" 
            style={{ backgroundImage: `url(${preview})` }}
            className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="Select img" />
            </label>

            <label htmlFor="company">EMPRESA *</label>
            <input 
                id="company"
                placeholder="Sua empresa incrivel"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />
            <label htmlFor="techs">TECNOGOLIAS *<span>(separadas por vírgula)</span></label>
            <input 
                id="techs"
                placeholder="Quais tecnologias usam?"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />
            <label htmlFor="value">VALOR DA DIÁRIA *<span>(em branco para gratuito)</span></label>
            <input 
                id="value"
                placeholder="Valor cobrado por dia"
                value={price}
                onChange={event => setPrices(event.target.value)}
            />

            <button type="submit" className="btn">Cadastrar</button>
        </form>
    )
};