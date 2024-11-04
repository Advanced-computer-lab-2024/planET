import React, { useEffect, useState } from "react";
import CustomFormGroup from "../../components/FormGroup/FormGroup";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useAppSelector } from "../../store/hooks";
import { GovernorService } from "../../services/GovernorService";
import showToast from "../../utils/showToast";
import { ToastTypes } from "../../utils/toastTypes";

interface FormData {
  changePassword: string;
  retypePassword: string;
}

const ChangePasswordG: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    changePassword: "",
    retypePassword: "",
  });

  const Governor = useAppSelector((state) => state.user);

  useEffect(() => {
    setFormData({
      changePassword: "",
      retypePassword: "",
    });
  }, [Governor]);
  const OnClick = async () => {
    await GovernorService.changePass(Governor.email, {
      password: formData.changePassword,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.changePassword !== formData.retypePassword) {
      alert("Passwords don't match!");
      return;
    }
    showToast("Password Changed Successfully", ToastTypes.SUCCESS);
    // Handle form submission logic here (e.g., API request)
  };

  const handleCancel = () => {
    setFormData({
      changePassword: "",
      retypePassword: "",
    });
  };

  return (
    <div className="profile-form-container">
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <CustomFormGroup
                label="Change Password"
                type="password"
                placeholder="Enter your password"
                id="changePassword"
                name="changePassword"
                required={true}
                value={formData.changePassword}
                onChange={handleChange}
                disabled={false}
              />
            </Col>
            <Col>
              <CustomFormGroup
                label="Retype Password"
                type="password"
                placeholder="Retype your password"
                id="retypePassword"
                name="retypePassword"
                required={true}
                value={formData.retypePassword}
                onChange={handleChange}
                disabled={false}
              />
            </Col>
          </Row>

          <Button variant="main-inverse" type="submit" className="mt-3">
            Update Profile
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="mt-3 ml-2"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default ChangePasswordG;
