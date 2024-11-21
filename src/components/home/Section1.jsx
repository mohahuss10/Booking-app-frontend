import React, { useState } from 'react';
import TransportModal from '../transport/TransportModal';
import VenueModal from '../venue/VenueModal';
import SportsPitchModal from '../sports/SportsPitchModal';
import AppointmentsModal from '../appointments/AppointmentsModal';
import BackButton from '../BackButton';

function Section1() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isVenueModalOpen, setVenueModalOpen] = useState(false);
  const [isSportsPitchModalOpen, setSportsPitchModalOpen] = useState(false);
  const [isAppointmentsModalOpen, setAppointmentsModalOpen] = useState(false);

  const cards = [
    {
      title: 'Transport',
      image1: '/images/bus2.jpg',
    },
    {
      title: 'Venue',
      image1: '/images/library.jpg',
    },
    {
      title: 'Sports Pitch',
      image1: '/images/basketball.jpg',
    },
    {
      title: 'Appointments',
      image1: 'https://images.unsplash.com/photo-1522241112606-b5d35a468795?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  return (
    <div className='mb-20'>

      <div className='absolute top-5 left-10'>
        <BackButton />
      </div>
      <h1 className='mt-14 font-bold sm:ml-10 text-center text-3xl text-indigo-700'>What do you want to book</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:mx-3 mx-1 mt-20">
        {cards.map((card, index) => (
          <div key={index} className="mx-3 sm:ml-10">
            <div className="block overflow-hidden cursor-pointer" onClick={() => {
              if (card.title === 'Transport') {
                setModalOpen(true);
              } else if (card.title === 'Venue') {
                setVenueModalOpen(true)
              } else if (card.title === 'Sports Pitch') {
                setSportsPitchModalOpen(true)
              } else if (card.title === 'Appointments') {
                setAppointmentsModalOpen(true)
              }
            }}>
              <div className="relative sm:h-[250px]">
                {/* Image */}
                <img
                  src={card.image1}
                  alt={card.title}
                  className=" inset-0 h-full w-full object-cover"
                  loading='lazy'
                />
                {/* Tint overlay */}
                <div className="absolute inset-0 bg-black opacity-60"></div>
                
                {/* Title above the image and tint */}
                <div className="absolute inset-0 flex justify-center items-center z-10">
                  <h3 className="text-white font-semibold text-2xl">{card.title}</h3>
                </div>
              </div>
              <div className="relative bg-white pt-3">
                <h3 className="font-semibold text-lg">{card.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <TransportModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      <VenueModal isOpen={isVenueModalOpen} onClose={() => setVenueModalOpen(false)} />
      <SportsPitchModal isOpen={isSportsPitchModalOpen} onClose={() => setSportsPitchModalOpen(false)} />
      <AppointmentsModal isOpen={isAppointmentsModalOpen} onClose={() => setAppointmentsModalOpen(false)} />
    </div>
  );
}

export default Section1;
