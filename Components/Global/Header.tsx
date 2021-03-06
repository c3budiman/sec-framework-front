/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Avatar, Button, Col, Dropdown, Menu, Row } from "antd";
import { Header } from "antd/lib/layout/layout";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { themeColor } from "../../Configs/themeColor";
import { RootState } from "../../Redux/reducer";
import { isNotDashboard, ReplaceNavigateTo } from "../../Utils/Helpers/Routing";
import WizardCreateSession from "../Modals/WizardCreateSession";

type HeaderProps = {
  session: any;
};

function HeaderOur({ session }: HeaderProps) {
  const router = useRouter();
  const doLogout = async () => {
    const logout = await axios.get("/api/logout");
    if (logout?.data?.code === 0) {
      ReplaceNavigateTo("/login?code=1");
    }
  };
  const AssesmentSession = useSelector(
    (state: RootState) => state.assesmentSession.selectedSessions
  );
  const [openWizardCreateSession, setOpenWizardCreateSession] = useState<boolean>(false);

  useEffect(() => {
    if (AssesmentSession?.uuid === "" && session?.code === 0) setOpenWizardCreateSession(true);
  }, [AssesmentSession?.uuid]);

  const menuDesktop = (
    <Menu onClick={doLogout}>
      <Menu.Item>Signout</Menu.Item>
    </Menu>
  );
  const logoTextStyle = { fontSize: "14px", fontWeight: "bold", color: themeColor.fontPrimary };
  const loginTextStyle = { fontSize: "14px", fontWeight: 600, color: themeColor.fontPrimary, cursor: "pointer" };
  return (
    <>
      {session?.code === 0 && (
        <WizardCreateSession
          visible={openWizardCreateSession}
          onCancel={() => { setOpenWizardCreateSession(false); }}
        />
      )}
      {session?.code === 0 && (
        <Header className="site-layout-background" style={{ padding: 0, background: themeColor.headerPrimary }}>
          <Menu mode="horizontal">
            <Row
              style={{ width: "100%" }}
              align="middle"
              justify="space-between"
            >
              {
                !isNotDashboard(router) && (
                  <Row justify="center" style={{ marginLeft: "20px" }}>
                    <Button style={{ background: themeColor.darkBlueSecondary, color: "#fff" }} onClick={() => { setOpenWizardCreateSession(true); }}>
                      {AssesmentSession?.name}
                    </Button>
                  </Row>
                )
              }
              {isNotDashboard(router) && (
                <Link href="/dashboard" passHref>
                  <Row style={{ cursor: "pointer" }}>
                    <div className="logo">
                      <Image
                        src="/Images/logo.jpg"
                        alt="tesanjay"
                        height="40px"
                        width="40px"
                      />
                    </div>
                    <p id="headerTittle" style={logoTextStyle}>Security Assesment Framework</p>
                  </Row>
                </Link>
              )}
              <Dropdown overlay={menuDesktop}>
                <Row align="middle">
                  <Avatar
                    className="mx-4 my-auto pointer"
                    src="/Images/avatar.png"
                  />
                  <p
                    id="headerPeopleName"
                    style={{
                      margin: "0px 10px",
                      color: "#33539E",
                      fontWeight: "bold",
                    }}
                  >
                    {session?.data?.user?.name}
                  </p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    style={{ marginRight: "10px" }}
                    src="/Icon/header/arrow-down-blue.svg"
                    alt="dropdown"
                  />
                </Row>
              </Dropdown>
            </Row>
          </Menu>
        </Header>
      )}
      {session?.code === "-1" && (
        <Header className="site-layout-background" style={{ padding: 0, background: themeColor.headerPrimary }}>
          <Row align="middle" justify="space-between">
            <Col xs={12} sm={12} md={12} lg={12}>
              <Row align="middle">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  style={{ marginRight: "10px", marginBottom: "10px", marginLeft: "20px" }}
                  src="/Images/logo.jpg"
                  alt="tesanjay"
                  height="40px"
                  width="40px"
                />
                <p id="headerTittle" style={logoTextStyle}>Security Assesment Framework</p>
              </Row>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
              <div style={{ float: "right", marginRight: "20px" }}>
                <Link href="/login" passHref>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a>
                    <p id="login-CTA" style={loginTextStyle}>Sign In</p>
                  </a>
                </Link>
              </div>
            </Col>
          </Row>
        </Header>
      )}
    </>
  );
}

export default HeaderOur;
