import React from 'react';
import { Link } from 'react-router-dom';
import { Car, MapPin, Users, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { FEATURED_CARS } from '../../data/mockData';
import { formatPKR } from '../../utils/formatters';

const FeaturedCarsSection = () => {
  return (
    <section className="py-5 bg-white">
      <div className="container py-3">
        {/* Section Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
          <div>
            <span className="badge-gold mb-2">Luxury & Baraat Transport</span>
            <h2 className="font-serif fw-bold mb-1">Bridal Car Rental & Guest Coaches</h2>
            <p className="text-muted mb-0">Arrive in royal elegance with vetted vehicles and experienced chauffeurs.</p>
          </div>
          <Link to="/services/cars" className="btn-outline-gold mt-3 mt-md-0">
            View All Cars & Coaches <ArrowRight size={16} />
          </Link>
        </div>

        {/* Cars Grid */}
        <div className="row g-4">
          {FEATURED_CARS.map((car) => (
            <div key={car.id} className="col-12 col-sm-6 col-lg-3">
              <div className="wedding-card h-100">
                <div className="card-media">
                  <img src={car.image} alt={car.title} loading="lazy" />
                  <div className="position-absolute top-0 start-0 m-2">
                    <span className="badge bg-warning text-dark fw-bold px-2 py-1 small">
                      {car.carType}
                    </span>
                  </div>
                  <div className="position-absolute bottom-0 end-0 m-2">
                    <span className="badge bg-dark bg-opacity-75 text-white small">
                      Model {car.modelYear}
                    </span>
                  </div>
                </div>

                <div className="p-3 d-flex flex-column flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge-city">
                      <MapPin size={11} className="text-danger" /> {car.city}
                    </span>
                    <div className="d-flex align-items-center gap-1 small text-dark fw-bold">
                      <Star size={13} className="text-warning fill-warning" />
                      <span>{car.rating}</span>
                    </div>
                  </div>

                  <h6 className="font-serif fw-bold text-dark mb-2 lh-base">
                    <Link to={`/vendors/${car.id}`} className="text-decoration-none text-dark hover-gold">
                      {car.title}
                    </Link>
                  </h6>

                  <div className="small text-muted mb-3 flex-grow-1">
                    <div className="d-flex align-items-center gap-1 mb-1">
                      <Users size={13} className="text-warning" />
                      <span>{car.passengerCapacity} Passengers</span>
                    </div>
                    <div className="d-flex align-items-center gap-1 text-success">
                      <CheckCircle2 size={13} />
                      <span>{car.withDriver ? 'Chauffeur Included' : 'Self-Drive Available'}</span>
                    </div>
                  </div>

                  <div className="border-top pt-2 mt-auto d-flex justify-content-between align-items-center">
                    <div>
                      <span className="text-muted" style={{ fontSize: '0.75rem' }}>Rate</span>
                      <span className="price-tag d-block">
                        <span className="amount fs-6">{formatPKR(car.pricePKR)}</span>
                      </span>
                    </div>
                    <Link to={`/vendors/${car.id}`} className="btn-outline-gold py-1 px-2 fs-6" style={{ fontSize: '0.8rem' }}>
                      Reserve
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarsSection;
