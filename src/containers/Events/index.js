import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  // const conference = data?.events.filter((event) => event.type === "conférence");
  // const experience = data?.events.filter((event) => event.type === "expérience digitale");
  // const soiree = data?.events.filter((event) => event.type === "soirée entreprise");
 

  const filteredEvents = (
    (!type
      ? data?.events
      : data?.events) || []
  ).filter((event, index) => {
    if (
      (currentPage - 1) * PER_PAGE <= index &&
      PER_PAGE * currentPage > index
    ) {
      return true;
    }
    return false;
  });
  const changeType = (evtType) => {
    setCurrentPage(1);
    console.log(type);
    setType(evtType);
    console.log(type);
    console.log(evtType);
  };
  // Faire des calculs (fonctions maths en JS) pour que les numéros de page fonctionnent. (maximum de pages, index des items, déterminer les index à renvoyer en fonction de la page)
  // Vérifier pour math.floor

  // const pageNumber = renvoie le plus grand entier qui est inférieur ou égal à un nombre x (5.95 = 5, 5.05 = 5...)()
  // filteredEvents.length = 9 OU 1 divisé par 9 + 1
  const pageNumber = Math.floor((filteredEvents?.length || 1) / PER_PAGE) + 1;
  const typeList = new Set(data?.events.map((event) => event.type));
  console.log(filteredEvents.length);
  console.log(pageNumber);
 

  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (

        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={changeType }
          />

          
          <div id="events" className="ListContainer">

            {filteredEvents?.filter(e => !type || e.type === type).map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                
                
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
