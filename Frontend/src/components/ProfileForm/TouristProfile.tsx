import React, { useEffect, useState } from "react";
import CustomFormGroup from "../FormGroup/FormGroup";
import "./TouristProfile.css";
import Logo from "../../assets/person-circle.svg";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import nationalityOptionsData from "../../utils/nationalityOptions.json"; // Adjust the path as necessary
import { BiChevronDown } from "react-icons/bi"; // Importing a dropdown icon from react-icons
import { TouristService } from "../../services/TouristService";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { FaExchangeAlt, FaInfoCircle } from "react-icons/fa";
import { setStakeholder, setUser } from "../../store/userSlice";
import { useAppContext } from "../../AppContext";
import { ToastTypes } from "../../utils/toastTypes";
import showToastMessage from "../../utils/showToastMessage";
import { format } from "date-fns";
import { Utils } from "../../utils/utils";

interface NationalityOption {
  value: string;
  label: string;
}

const nationalityOptions: NationalityOption[] = nationalityOptionsData;

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  profession: string;
  password: string;
  retypePassword: string;
  username: string;
  nationality: string;
  dob: string;
}

const TouristProfile: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    profession: "",
    password: "",
    retypePassword: "",
    username: "",
    nationality: "",
    dob: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      // Use a regular expression to allow only numbers
      if (/[^0-9]/.test(value)) {
        return; // Prevent updating the state if non-numeric characters are entered
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const Tourist = useAppSelector((state: { user: any }) => state.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      { field: formData.firstName, name: "First Name" },
      { field: formData.lastName, name: "Last Name" },
      { field: formData.email, name: "Email" },
      { field: formData.mobile, name: "Mobile Number" },
      { field: formData.profession, name: "Profession" },
      { field: formData.nationality, name: "Nationality" },
    ];

    for (const { field, name } of requiredFields) {
      if (!field) {
        showToastMessage(`${name} is required.`, ToastTypes.ERROR);
        return;
      }
    }
    if (
      (formData.password && !formData.retypePassword) ||
      (!formData.password && formData.retypePassword)
    ) {
      showToastMessage(
        "Please fill out both password fields.",
        ToastTypes.ERROR
      );
      return;
    }

    if (formData.password && formData.password !== formData.retypePassword) {
      showToastMessage("Passwords do not match", ToastTypes.ERROR);
      return;
    }
    if (formData.mobile.length !== 11) {
      showToastMessage(
        "Mobile number must be exactly 11 digits.",
        ToastTypes.ERROR
      );
      return;
    }

    // Construct update data
    const updateData: any = {
      name: formData.firstName + " " + formData.lastName,
      newEmail: formData.email,
      phone_number: formData.mobile,
      job: formData.profession,
      nation: formData.nationality,
    };

    if (formData.password) {
      updateData.password = formData.password;
    }

    const Tourist1 = await TouristService.updateTourist(
      Tourist.email,
      updateData
    );

    // Display toast based on the update response
    if (Tourist1.status === 200) {
      const updatedTourist = {
        ...Tourist,
        email: updateData.newEmail,
        name: updateData.name,
        phone_number: updateData.phone_number,
        stakeholder_id: {
          ...Tourist.stakeholder_id,
          job: updateData.job,
          nation: updateData.nation,
        },
      }
      dispatch(setUser(updatedTourist));
    } else {
      showToastMessage("Error in updating", ToastTypes.ERROR);
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.usernameOrEmail && user.password) {
      const password = Utils.decryptPassword(user.password)
      if (password !== updateData.password && formData.password) {
        localStorage.setItem("user", JSON.stringify({ usernameOrEmail: user.usernameOrEmail, password: Utils.encryptPassword(updateData.password) }));
      }
    }

  };

  useEffect(() => {
    setFormData({
      firstName: Tourist.name.split(" ")[0],
      lastName: Tourist.name.split(" ")[1] || "", // Adding a fallback for lastName in case there's no space
      email: Tourist.email,
      mobile: Tourist.phone_number,
      profession: Tourist.stakeholder_id?.job || "", // Optional chaining in case stakeholder_id is undefined
      password: "",
      retypePassword: "",
      username: Tourist.username,
      nationality: Tourist.stakeholder_id?.nation || "", // Optional chaining
      dob: format(new Date(Tourist.stakeholder_id?.date_of_birth), "dd/MM/yyyy") || "", // Optional chaining
    });
  }, [Tourist]); // Dependency array to rerun this effect when Tourist data changes


  const handleCancel = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      profession: "",
      password: "",
      retypePassword: "",
      username: "",
      nationality: "",
      dob: "",
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pointsToTransfer, setPointsToTransfer] = useState("");
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [loyaltyPoints, setLoyaltyPoints] = useState(
    Tourist.stakeholder_id?.loyality_points
  );

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openTransferModal = () => {
    setIsTransferModalOpen(true);
  };

  const closeTransferModal = () => {
    setIsTransferModalOpen(false);
  };

  const handlePointsChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPointsToTransfer(e.target.value);
  };

  const dispatch = useAppDispatch();

  const transferPointsToWallet = async () => {
    try {
      const user = await TouristService.redeemPoints(
        Tourist.email,
        Number(pointsToTransfer)
      );
      setLoyaltyPoints(
        (prevPoints: number) => prevPoints - Number(pointsToTransfer)
      );
      setPointsToTransfer("");
      closeTransferModal();
      dispatch(setStakeholder(user.data));
    } catch (error) {
      console.error("Error transferring points:", error);
    }
  };

  const { currency } = useAppContext();

  return (
    <div className="profile-form-container">
      <Container>
        <Row className="align-items-center justify-content-center mb-4 w-100">
          <Col xs={7} className="text-left">
            <h2 className="my-profile-heading">My Profile</h2>
          </Col>
          <Col xs={3} className="text-center">
            <img
              src={Logo}
              width="70"
              height="50"
              className="align-top logo"
              alt="Travel Agency logo"
            />
          </Col>
        </Row>
        <Row className="align-items-center justify-content-center w-100 mt-5 mb-4">
          <Col xs={12} md={4} className="wallet-card">
            <h3>
              Points
              <FaInfoCircle
                style={{ cursor: "pointer", marginLeft: "10px" }}
                onClick={openModal}
              />
            </h3>{" "}
            {/* Add the info icon */}
            <p>{Tourist.stakeholder_id.loyality_points}</p>
          </Col>
          <Col md={3} className="d-flex justify-content-center align-items-center">
            <FaExchangeAlt
              className="exchange-icon"
              style={{ cursor: "pointer" }}
              onClick={openTransferModal}
            />
          </Col>
          <Modal show={isModalOpen} onHide={closeModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Points Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>Earn Points</h5>
              <p>It's divided into 3 levels</p>
              <p>Level 1: For every 1 EGP spent, you'll earn 0.5 points</p>
              <p>Level 2: For every 1 EGP spent, you'll earn 1 point</p>
              <p>Level 3: For every 1 EGP spent, you'll earn 1.5 points</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Col xs={12} md={4} className="wallet-card">
            <h3>Wallet</h3>
            <p>
              {currency} {Tourist.stakeholder_id.wallet}
            </p>
            <Modal
              show={isTransferModalOpen}
              onHide={closeTransferModal}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Transfer Points</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formPoints">
                    <Form.Label>
                      Enter the number of points to transfer
                    </Form.Label>
                    <div>
                      <Form.Text>
                        Every 10,000 points is equal to 100 EGP
                      </Form.Text>
                    </div>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        type="number"
                        value={pointsToTransfer}
                        onChange={handlePointsChange}
                        placeholder="Enter points"
                        className="mx-2 custom-form-control"
                        step="10000"
                        min="0"
                      />
                    </div>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeTransferModal}>
                  Close
                </Button>
                <Button variant="main-inverse" onClick={transferPointsToWallet}>
                  Transfer
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Container>

      <Container>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <CustomFormGroup
                label="First Name:"
                type="text"
                placeholder="Enter your First Name"
                id="firstName"
                name="firstName"
                disabled={false}
                required={true}
                value={formData.firstName}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <CustomFormGroup
                label="Last Name:"
                type="text"
                placeholder="Enter your Last Name"
                id="lastName"
                name="lastName"
                disabled={false}
                required={true}
                value={formData.lastName}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <CustomFormGroup
                label="Email:"
                type="email"
                placeholder="Enter your email"
                id="email"
                name="email"
                disabled={false}
                required={true}
                value={formData.email}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <CustomFormGroup
                label="Username:"
                type="text"
                placeholder="Enter your username"
                id="username"
                name="username"
                disabled={true}
                required={false}
                value={formData.username}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <CustomFormGroup
                label="Mobile Number:"
                type="tel"
                placeholder="Enter your mobile number"
                id="mobile"
                name="mobile"
                disabled={false}
                required={true}
                value={formData.mobile}
                onChange={handleChange}
                pattern="^[0-9]{11}$"
              />
            </Col>
            <Col>
              <Form.Group className="form-group" controlId="nationality">
                <Form.Label>Nationality:</Form.Label>
                <div className="custom-select-container">
                  <Form.Control
                    as="select"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    className="custom-form-control"
                    required
                  >
                    <option value="">Select your nationality</option>
                    {nationalityOptions.map((option: NationalityOption) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Control>
                  <BiChevronDown className="dropdown-icon" />{" "}
                  {/* Dropdown icon */}
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <CustomFormGroup
                label="Profession:"
                type="text"
                placeholder="Enter your profession"
                id="profession"
                name="profession"
                disabled={false}
                required={true}
                value={formData.profession}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <CustomFormGroup
                label="Date of Birth (DD/MM/YYYY):"
                type="text"
                placeholder="Enter your date of birth"
                id="dob"
                name="dob"
                disabled={true}
                required={false}
                value={formData.dob}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <CustomFormGroup
                label="Password:"
                type="password"
                placeholder="Enter your password"
                id="password"
                name="password"
                disabled={false}
                required={false}
                value={formData.password}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <CustomFormGroup
                label="Retype Password:"
                type="password"
                placeholder="Retype your password"
                id="retypePassword"
                name="retypePassword"
                disabled={false}
                required={false}
                value={formData.retypePassword}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <div className="d-flex justify-content-center">
            <Button type="submit" variant="main-inverse" className="px-5 py-2">
              Confirm
            </Button>
            <Button variant="main-border" className="px-5 py-2" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default TouristProfile;
