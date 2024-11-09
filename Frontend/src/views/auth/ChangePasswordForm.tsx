import React, { useEffect, useState } from "react";
import CustomFormGroup from "../../components/FormGroup/FormGroup";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useAppSelector } from "../../store/hooks";
import { AdminService } from "../../services/AdminService";
import showToastMessage from "../../utils/showToastMessage";
import { ToastTypes } from "../../utils/toastTypes";

interface FormData {
  changePassword: string;
  retypePassword: string;
}

const ChangePasswordForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    changePassword: "",
    retypePassword: "",
  });

  const Admin = useAppSelector((state) => state.user);

  useEffect(() => {
    setFormData({
      changePassword: "",
      retypePassword: "",
    });
  }, [Admin]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.changePassword &&
      formData.changePassword !== formData.retypePassword
    ) {
      showToastMessage("Passwords don't match!", ToastTypes.ERROR);
      return;
    }
    if (
      (formData.changePassword && !formData.retypePassword) ||
      (!formData.changePassword && formData.retypePassword)
    ) {
      showToastMessage(
        "Please fill out both password fields.",
        ToastTypes.ERROR
      );
      return;
    }
    try {
      const response = await AdminService.changePass(Admin.email, {
        password: formData.changePassword,
      });

      if (response.status === 200) {
        showToastMessage("Password changed successfully", ToastTypes.SUCCESS);
      } else {
        showToastMessage("Error changing password", ToastTypes.ERROR);
      }
    } catch (error) {
      showToastMessage(
        "An error occurred while changing password",
        ToastTypes.ERROR
      );
    }
  };

  const handleCancel = () => {
    setFormData({
      changePassword: "",
      retypePassword: "",
    });
  };

  return (
    <div className="profile-form-container mt-5">
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

          <Button type="submit" variant="main-inverse" className="mt-4">
            Update Profile
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="mt-4 ms-2"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default ChangePasswordForm;
