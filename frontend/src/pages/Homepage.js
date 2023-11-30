import React from 'react'
import{Box, Container,Text} from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
const Homepage = () => {
  return (
      <Container maxW='xl'>
             <Box 
                  justifyContent='center'
                  p={3}
                  bg='white'
                  w='100%'
                  m='40px 0 15px  0'
                  borderRadius='lg'
                  borderwidth='1px'
                >
              <Text fontSize='larger' fontfamily= 'Work sans' color='Black'>
                        Telly- Tebie
              </Text>

             </Box>

             <Box bg='white' w='100%' p={4} borderRadius='lg'    borderwidth='1px'>
             <Tabs variant='soft-rounded'>
                            <TabList mb={'1em'}>
                             <Tab width={"50%"}>Login </Tab>  <Tab width={"50%"}>Sign-up</Tab>
                            </TabList>
                            <TabPanels>
                              <TabPanel>
                                  <Login/>
                              </TabPanel>
                              <TabPanel>
                                 <Signup/>
                              </TabPanel>
                            </TabPanels>
                          </Tabs>
             </Box>
      </Container>
  )
}

export default Homepage