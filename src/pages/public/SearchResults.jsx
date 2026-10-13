import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { FEATURED_VENUES, FEATURED_CARS, FEATURED_PHOTOGRAPHY, FEATURED_CATERING } from '../../data/mockData';
import { formatPKR, formatDate } from '../../utils/formatters';
import { serviceApi } from '../../services/api';
import { MapPin, Star, ShieldCheck, Search, Filter, Loader2, Calendar } from 'lucide-react';

const ALL_SEARCH_ITEMS = [
  ...FEATURED_VENUES.map(v => ({ ...v, category: 'Wedding Venues', categorySlug: 'venues' })),
  ...FEATURED_CARS.map(c => ({ ...c, category: 'Car Rental', categorySlug: 'cars' })),
  ...FEATURED_PHOTOGRAPHY.map(p => ({ ...p, category: 'Photography', categorySlug: 'photography' })),
  ...FEATURED_CATERING.map(ct => ({ ...ct, category: 'Catering', categorySlug: 'catering' }))
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const cityParam = searchParams.get('city') || '';
  const dateParam = searchParams.get('date') || '';
  const eventParam = searchParams.get('event') || '';
  const searchParam = searchParams.get('q') || '';

  const [liveResults, setLiveResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchLiveResults() {
      try {
        setLoading(true);
        const params = {};
        if (categoryParam) params.category = categoryParam;
        if (cityParam) params.city = cityParam;
        if (searchParam) params.search = searchParam;

        const res = await serviceApi.getServices(params);
        if (isMounted && res?.data?.services && res.data.services.length > 0) {
          const formatted = res.data.services.map(s => ({
            id: s._id,
            title: s.title,
            category: s.category?.name || 'Wedding Service',
            categorySlug: s.category?.slug || 'venues',
            city: s.city,
            rating: s.rating || 4.9,
            pricePKR: s.basePricePKR,
            priceUnit: s.priceUnit || 'slot',
            image: s.coverImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
            description: s.description
          }));
          setLiveResults(formatted);
          setIsLive(true);
        } else {
          setIsLive(false);
        }
      } catch {
        if (isMounted) setIsLive(false);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchLiveResults();
    return () => { isMounted = false; };
  }, [categoryParam, cityParam, searchParam]);

  // Fallback to local filter if live is empty or server offline
  const fallbackResults = useMemo(() => {
    return ALL_SEARCH_ITEMS.filter(item => {
      const matchCat = !categoryParam || item.categorySlug === categoryParam;
      const matchCity = !cityParam || item.city.toLowerCase() === cityParam.toLowerCase();
      const matchSearch = !searchParam || item.title.toLowerCase().includes(searchParam.toLowerCase());
      return matchCat && matchCity && matchSearch;
    });
  }, [categoryParam, cityParam, searchParam]);

  const displayedResults = isLive && liveResults.length > 0 ? liveResults : fallbackResults;

  return (
    <div>
      <PageHeader 
        title="Search Results"
        subtitle={`Showing vendors matching your wedding planning filters in Pakistan.`}
        badge="Search Marketplace"
        breadcrumbs={[{ label: 'Search' }]}
      />

      <div className="container py-5">
        {/* Active Filters */}
        <div className="d-flex flex-wrap align-items-center gap-2 mb-4 p-3 bg-white rounded-3 border">
          <span className="small text-muted fw-bold d-flex align-items-center gap-1">
            <Filter size={14} /> Active Filters:
          </span>
          {categoryParam ? (
            <span className="badge bg-warning text-dark">Category: {categoryParam}</span>
          ) : (
            <span className="badge bg-light text-secondary border">All Categories</span>
          )}
          {cityParam ? (
            <span className="badge bg-warning text-dark">City: {cityParam}</span>
          ) : (
            <span className="badge bg-light text-secondary border">All Pakistani Cities</span>
          )}
          {dateParam ? (
            <span className="badge bg-warning text-dark d-inline-flex align-items-center gap-1">
              <Calendar size={12} /> Date: {formatDate(dateParam)}
            </span>
          ) : (
            <span className="badge bg-light text-secondary border d-inline-flex align-items-center gap-1">
              <Calendar size={12} /> Date: All Dates Open
            </span>
          )}
          {eventParam && (
            <span className="badge bg-warning text-dark">Event: {eventParam}</span>
          )}
          {searchParam && (
            <span className="badge bg-info text-dark">Keyword: {searchParam}</span>
          )}
          {isLive && (
            <span className="badge bg-success bg-opacity-10 text-success ms-2">Live Backend Results</span>
          )}
          <Link to="/search" className="btn btn-link btn-sm text-muted ms-auto text-decoration-none">
            Clear Filters
          </Link>
        </div>

        {/* Results Count */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted small">
            Found <strong>{displayedResults.length}</strong> matching options
          </span>
          {loading && (
            <span className="small text-muted d-flex align-items-center gap-1">
              <Loader2 size={14} className="spin" /> Searching live inventory...
            </span>
          )}
        </div>

        {/* Results Grid */}
        <div className="row g-4">
          {displayedResults.length > 0 ? (
            displayedResults.map((item) => {
              const vendorUrl = `/vendors/${item.id}?city=${encodeURIComponent(item.city)}${dateParam ? `&date=${dateParam}` : ''}${eventParam ? `&event=${encodeURIComponent(eventParam)}` : ''}`;
              return (
                <div key={item.id} className="col-12 col-md-6 col-lg-4">
                  <div className="wedding-card h-100">
                    <div className="card-media">
                      <img src={item.image} alt={item.title} loading="lazy" />
                      <div className="position-absolute top-0 end-0 m-2">
                        <span className="badge bg-dark bg-opacity-75 text-white small">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 d-flex flex-column flex-grow-1">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="badge-city">
                          <MapPin size={12} className="text-danger" /> {item.city}
                        </span>
                        <div className="d-flex align-items-center gap-1 text-dark fw-bold small">
                          <Star size={14} className="text-warning fill-warning" />
                          <span>{item.rating}</span>
                        </div>
                      </div>

                      <h5 className="font-serif fw-bold text-dark mb-1">
                        <Link to={vendorUrl} className="text-decoration-none text-dark hover-gold">
                          {item.title}
                        </Link>
                      </h5>

                      <p className="text-muted small mb-2 flex-grow-1">
                        {item.description || item.vendorName}
                      </p>

                      {/* Date Availability Indicator */}
                      <div className="p-2 bg-light rounded-2 mb-3 d-flex align-items-center justify-content-between small">
                        <div className="d-flex align-items-center gap-1 text-muted">
                          <Calendar size={13} className="text-warning flex-shrink-0" />
                          <span>Event Slot:</span>
                        </div>
                        <span className="badge bg-success bg-opacity-10 text-success fw-bold">
                          {dateParam ? formatDate(dateParam) : 'Open For Booking'}
                        </span>
                      </div>

                      <div className="d-flex justify-content-between align-items-center pt-2 border-top mt-auto">
                        <span className="price-tag">
                          <span className="amount fs-5">{formatPKR(item.pricePKR)}</span>
                          <span className="text-muted small ms-1 fw-normal">/ {item.priceUnit}</span>
                        </span>
                        <Link to={vendorUrl} className="btn-outline-gold btn-sm">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12 text-center py-5">
              <Search size={48} className="text-muted mb-3" />
              <h5 className="fw-bold text-dark">No services found matching your criteria</h5>
              <p className="text-muted">Try adjusting your category or city filters to find available wedding vendors.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
