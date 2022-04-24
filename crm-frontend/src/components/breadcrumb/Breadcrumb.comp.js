import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export const PageBreadcrumb = ({ page }) => {
  const {user} = useSelector(state => state.user)
  return (
    <Breadcrumb>
      <LinkContainer to={ user && user.authenticated ? "/dashboard": "/"}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </LinkContainer>
      <Breadcrumb.Item active>{page}</Breadcrumb.Item>
    </Breadcrumb>
  );
};
