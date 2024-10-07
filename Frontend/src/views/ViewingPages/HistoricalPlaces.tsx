import { t } from "i18next";
import { HistoricalLocationCard } from "../../components/Cards/HistoricalLocationCard";
import FilterBy from "../../components/FilterBy/FilterBy";
import React, { useEffect } from "react";
import { Col, Row, Container, Form, InputGroup } from "react-bootstrap";
import { BiSort } from "react-icons/bi";

import { FaSearch } from "react-icons/fa";
import filterOptions from '../../utils/filterOptions.json';
import { HistoricalService } from "../../services/HistoricalService";
import { IHistorical_location, IHistorical_location_tourist } from "../../types/IHistoricalLocation";
import { useNavigate } from "react-router-dom";



export default function HistoricalLocationsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [ historical, setHistorical] = React.useState<IHistorical_location_tourist[]>([])
  const [filtercomponent, setfilterComponents] = React.useState({});
  const [sortBy, setSortBy] = React.useState("topPicks"); // State for sort by selection

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };
  const getHistorical = async () => {
    const HistoricalData = await HistoricalService.getAllHistorical_Location("masry","engineer");
    setHistorical(HistoricalData.data);
    console.log(HistoricalData);
  };
  const getFilterComponents = async () => {
    const filterData = await HistoricalService.getFilterComponents();
    setfilterComponents(filterData.data);
  };
  useEffect(() => {
    getHistorical();
    getFilterComponents();
  }, []);
  const onHistoricalClick = (id : string) => {
    navigate(`/Historical/${id}`);
  }
  
  // Function to sort historical locations based on selected criteria
  const sortedLocations = [...historical].sort((a, b) => {
    switch (sortBy) {
      case "topPicks":
        return b.average_rating - a.average_rating;
      case "reviewsLowToHigh":
        return (a.reviewsCount ?? 0) - (b.reviewsCount ?? 0);
      case "reviewsHighToLow":
        return (b.reviewsCount ?? 0) - (a.reviewsCount ?? 0);
      default:
        return 0;
    }
  });

  const filteredLocations = sortedLocations.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container fluid>
      <Row className="justify-content-center my-4">
        <Col md={6} className="text-center">
          <h1 className="fw-bold" style={{ fontFamily: "Poppins" }}>Explore Historical Locations</h1>
        </Col>
      </Row>

      <Row className="justify-content-center my-4">
        <Col md={4}>
          <InputGroup>
            <InputGroup.Text
              id="basic-addon1"
              style={{
                backgroundColor: "#F7F7F7",
                borderRadius: "50px 0 0 50px",
                border: "1px solid #D76F30",
              }}
            >
              <FaSearch color="#D76F30" /> {/* Search icon */}
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                border: "1px solid #D76F30",
                borderRadius: "0 50px 50px 0",
                backgroundColor: "#F7F7F7",
                boxShadow: "none",
              }}
            />
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col md={3} className="border-bottom pb-2">
          <FilterBy filterOptions={filtercomponent}/>
        </Col>

        <Col md={9} className="p-3">
          <Row>
            {/* Sort By Section */}
            <div className="sort-btn w-auto d-flex align-items-center">
              <BiSort />
              <Form.Select value={sortBy} onChange={handleSortChange}>
                <option value="topPicks">Our Top Picks</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
              </Form.Select>
            </div>
            {historical.map((location:IHistorical_location_tourist, index) => (
              <Col key={location._id} xs={12} className="mb-4 ps-0">
              <HistoricalLocationCard
                Name={location.name}
                location={"cairo"}
                imageUrl={""}
                RatingVal={location.average_rating}
                Reviews={location.reviewsCount ?? 0}
                Description={location.description}
                isActive={location.active_flag}
                tags={location.tags ? Object.values(location.tags) : []}
                onChange={() => console.log(`${location.name} booking status changed`)}
                Price={location.price}
                OpeningHourFrom={location.opening_hours_from}
                OpeningHourTo={location.opening_hours_to}
                OpeningDays={location.opening_days.join(",")}
                onClick={() => onHistoricalClick(location._id)}
              />
            </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}