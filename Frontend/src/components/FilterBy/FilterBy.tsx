import React, { useEffect } from "react";
import "./FilterBy.css";
import { Col, Container, Form, Row } from "react-bootstrap";
import MultiRangeSlider from "../MultiSelectRange/MultiSliderRange";
import { format } from "date-fns";

interface filterData {
  [key: string]: any;
}

interface FilterByProps {
  filterOptions: { [key: string]: any };
  onFilterChange: (filter: filterData) => void; // Add this prop
  initialFilter?: filterData;
}

const FilterBy: React.FC<FilterByProps> = ({
  filterOptions,
  onFilterChange,
  initialFilter,
}) => {
  const [filter, setFilter] = React.useState<filterData>({});

  useEffect(() => {
    initialFilter && setFilter(initialFilter);
    console.log(initialFilter);
  }, [initialFilter]);

  const handleCheckboxChange = (key: string, value: string) => {
    setFilter((prevFilter) => {
      const selectedValues = prevFilter[key] || [];
      const newSelectedValues = selectedValues.includes(value)
        ? selectedValues.filter((v: string) => v !== value)
        : [...selectedValues, value];
      const newFilter = { ...prevFilter, [key]: newSelectedValues };
      onFilterChange(newFilter); // Call the callback function with the updated filter
      return newFilter;
    });
  };

  const renderFilterFields = () => {
    return Object.keys(filterOptions).map((key) => {
      const field = filterOptions[key];
      switch (field.type) {
        case "multi-select":
          if ("values" in field) {
            return (
              <Row className="border-bottom pb-2" key={key}>
                <span className="py-2">{key}</span>
                {field.values.map((value: string, index: number) => (
                  <Form.Check
                    inline
                    label={value}
                    name="group1"
                    type="checkbox"
                    id={`inline-checkbox-${key}-${index}`}
                    className="ms-3"
                    key={index}
                    checked={
                      filter[key.toLowerCase()]?.includes(value) || false
                    }
                    onChange={() =>
                      handleCheckboxChange(key.toLowerCase(), value)
                    }
                  />
                ))}
              </Row>
            );
          }
          break;

        case "slider":
          if ("min" in field && "max" in field) {
            return (
              <Row className="border-bottom pb-5" key={key}>
                <span className="py-2">{key}</span>
                <MultiRangeSlider
                  min={field.min}
                  max={field.max}
                  onChange={({ min, max }: { min: number; max: number }) => {
                    setFilter((prevFilter) => {
                      const newFilter = {
                        ...prevFilter,
                        [key.toString().toLowerCase()]: `${min}-${max}`,
                      };
                      onFilterChange(newFilter);
                      return newFilter;
                    });
                  }}
                />
              </Row>
            );
          }
          break;

        case "date-range":
          const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            let updatedFilter = { ...filter, [name]: value };
            const fromDate = updatedFilter.fromDate ? format(new Date(updatedFilter.fromDate), "yyyy/MM/dd") : "";
            const toDate = updatedFilter.toDate ? format(new Date(updatedFilter.toDate), "yyyy/MM/dd") : "";
            let dateRange = "";

            if (fromDate && toDate) {
              dateRange = `${fromDate}-${toDate}`;
            } else if (fromDate) {
              dateRange = fromDate;
            } else if (toDate) {
              dateRange = toDate;
            }
            updatedFilter = { ...updatedFilter, [key.toLowerCase()]: dateRange };
            setFilter(updatedFilter);
            onFilterChange(updatedFilter);
          };
          return (
            <Row className="border-bottom pb-2" key={key}>
              <span className="py-2">{key}</span>
              <Form.Group className="form-group" id="fromDate">
                <Form.Label>From Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="dd/mm/yyyy"
                  value={filter.fromDate}
                  onChange={handleDateChange}
                  name="fromDate"
                  className="custom-form-control"
                  min={field.start.toString().split("T")[0]}
                  max={field.end.toString().split("T")[0]}
                />
              </Form.Group>
              <Form.Group className="form-group" id="toDate">
                <Form.Label>To Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="dd/mm/yyyy"
                  value={filter.toDate}
                  onChange={handleDateChange}
                  name="toDate"
                  className="custom-form-control"
                  min={field.start.toString().split("T")[0]}
                  max={field.end.toString().split("T")[0]}
                />
              </Form.Group>
            </Row>
          );

        default:
          return null;
      }
    });
  };

  return (
    <Container fluid className="m-3">
      <Row>
        <Col className="filterby">
          <Row className="border-bottom py-2">
            <span>Filter By:</span>
          </Row>
          {renderFilterFields()}
        </Col>
      </Row>
    </Container>
  );
};

export default FilterBy;
