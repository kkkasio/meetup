import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { MdAdd, MdClear } from 'react-icons/md';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import history from '~/services/history';
import api from '~/services/api';

import { Container, Header, Meetups, Meetup, Empty } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('organizing');
      setMeetups(response.data);
    }

    loadMeetups();
  }, []);

  function navigateNewMeetup() {
    history.push('/new');
  }

  return (
    <Container>
      <Header>
        <h1>Meus meetups</h1>
        <button type="button" onClick={navigateNewMeetup}>
          <MdAdd color="#fff" size={25} /> Novo meetup
        </button>
      </Header>
      {meetups.length > 0 ? (
        <Meetups>
          {meetups.map(meetup => (
            <Meetup key={meetup.id}>
              <Link to={`details/${meetup.id}`}>
                <h2>{meetup.title}</h2>
              </Link>
              <div>
                <span>
                  {format(parseISO(meetup.date), "dd 'de' MMMM', às ' h'h' ", {
                    locale: pt,
                  })}
                </span>
                <button type="button">
                  <MdClear size={25} color="#fff" />
                </button>
              </div>
            </Meetup>
          ))}
        </Meetups>
      ) : (
        <Empty>
          <h2>Você não possui nenhum meetup cadastrado</h2>
        </Empty>
      )}
    </Container>
  );
}
