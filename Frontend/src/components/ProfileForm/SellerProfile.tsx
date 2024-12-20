import React, { useEffect, useState } from "react";
import CustomFormGroup from "../FormGroup/FormGroup";
import "./ProfileForm.css";
import Logo from "../../assets/person-circle.svg";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useAppSelector } from "../../store/hooks";
import { SellerServices } from "../../services/SellerServices";
import { FileService } from "../../services/FileService";
import { isValidObjectId } from "../..//utils/CheckObjectId";
import { ToastTypes } from "../../utils/toastTypes";
import showToastMessage from "../../utils/showToastMessage";
import { Utils } from "../../utils/utils";
import { useDispatchContext } from "../../dispatchContenxt";
import { setUser } from "../../store/userSlice";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  retypePassword: string;
  username: string;
  description: string;
  logo: File | null;
}

const SellerProfile: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    retypePassword: "",
    username: "",
    description: "",
    logo: null, // Initialize logo as null
  });
  const [fileUrl, setFileUrl] = useState("");
  const Seller = useAppSelector((state) => state.user);

  const getSellerData = async () => {
    if (
      Seller.stakeholder_id?.logo &&
      isValidObjectId(Seller.stakeholder_id.logo)
    ) {
      const file = await FileService.downloadFile(Seller.stakeholder_id.logo);

      const url = URL.createObjectURL(file);
      setFileUrl(url);
      setFormData({
        firstName: Seller.name?.split(" ")[0] || "",
        lastName: Seller.name?.split(" ")[1] || "",
        email: Seller.email || "",
        mobile: Seller.phone_number || "",
        password: "",
        retypePassword: "",
        username: Seller.username || "",
        logo: file.data || null,
        description: Seller.stakeholder_id?.description || "",
      });
    } else {
      setFormData({
        firstName: Seller.name?.split(" ")[0] || "",
        lastName: Seller.name?.split(" ")[1] || "",
        email: Seller.email || "",
        mobile: Seller.phone_number || "",
        password: "",
        retypePassword: "",
        username: Seller.username || "",
        logo: null,
        description: Seller.stakeholder_id?.description || "",
      });
    }
  };

  useEffect(() => {
    getSellerData();
  }, [Seller]);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, logo: e.target.files[0] });
      setFileUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const dispatch = useDispatchContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.retypePassword) {
      showToastMessage("Passwords do not match", ToastTypes.ERROR);
      return; // Exit if passwords don't match
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

    if (formData.mobile.length !== 11) {
      showToastMessage(
        "Mobile number must be exactly 11 digits.",
        ToastTypes.ERROR
      );
      return;
    }
    const updateData: any = {
      name: formData.firstName + " " + formData.lastName,
      email: formData.email,
      description: formData.description,
      phone_number: formData.mobile,
      password: formData.password,
    };

    if (formData.logo) {
      const file = await FileService.uploadFile(formData.logo);
      updateData.logo = file.data._id;
    }

    const seller = await SellerServices.updateSellerServices(Seller.email, updateData);

    if (seller.status === 200) {
      const updatedSeller = {
        ...Seller,
        name: updateData.name,
        email: updateData.email,
        phone_number: updateData.phone_number,
        stakeholder_id: {
          ...Seller.stakeholder_id,
          description: updateData.description,
          logo: updateData.logo,
        },
      }
      dispatch(setUser(updatedSeller))
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

  const handleCancel = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      retypePassword: "",
      username: "",
      description: "",
      logo: null, // Reset logo
    });
  };

  return (
    <div className="profile-form-container">
      <Row className="align-items-center mb-4 w-100">
        <Col xs={7} className="text-left">
          <h2 className="my-profile-heading">Welcome Seller!</h2>
        </Col>
        <Col xs={3} className="text-center">
          <img
            src={fileUrl != "" ? fileUrl : Logo}
            width="70"
            height="50"
            className="align-top logo"
            alt="Travel Agency logo"
          />
        </Col>
      </Row>

      <Container>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <CustomFormGroup
                label="First Name"
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
                label="Last Name"
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
                label="Email"
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
                label="Username"
                type="username"
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
                label="Change Password"
                type="password"
                placeholder="Change your password"
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
                label="Retype Password"
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

          <Row>
            <Col>
              <CustomFormGroup
                label="Description"
                type="text"
                placeholder="Enter your description"
                id="description"
                name="description"
                disabled={false}
                required={true}
                value={formData.description} // Correctly referencing description
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <CustomFormGroup
                label="Mobile Number"
                type="text"
                placeholder="Enter your mobile number"
                id="mobile"
                name="mobile"
                disabled={false}
                required={true}
                value={formData.mobile} // Correctly referencing description
                onChange={handleChange}
                pattern="^[0-9]{11}$"
              />
            </Col>
          </Row>

          {/* New row for logo upload */}
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3 form-group">
                <Form.Label>Upload Seller Logo</Form.Label>
                <Form.Control
                  type="file"
                  name="logo"
                  onChange={handleFileChange}
                  className="custom-form-control"
                  accept="image/*"
                />
              </Form.Group>
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

export default SellerProfile;
