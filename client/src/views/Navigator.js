import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Supplier from './Supplier';
import Item from './Item';
import Purchase from './Purchase';
import Customer from './customer';
import Contact from './Contact';
import Contact1 from './Contact1';
import Cash from './Cash';
import Credit from './Credit';
import Payment from './Payments';
function Navigator() {
  return (
    <div className='navigator'>
    <Tabs
      defaultActiveKey="Customer"
      id="Customer"
      className="mb"
      justify
    >
      <Tab eventKey="supplier" title="supplier">
        <div className='supplier'>
          <div>
            <Supplier/>
            </div>
            <div>
              <Contact1/>
              <Contact />
            </div>
          </div>
      </Tab>
        

      <Tab eventKey="Items" title="Items">
        <div className='item'>
         <Item/>
          </div>
          <div>
              <Contact1/>
              <Contact />
        </div>
      </Tab>
        
        <Tab eventKey="purchase" title="purchase">
          <Purchase />
         <div>
              <Contact1/>
              <Contact />
          </div>
      </Tab>
      
      <Tab eventKey="customer" title="customer">
        <div className='customer'>
        <Customer/>
        </div>
         <div>
              <Contact />
        </div>
      </Tab>
        
        <Tab eventKey="cash sales" title="Cash Sales ">
          <Cash />
        <div>
              <Contact />
        </div>
      </Tab>
        
        <Tab eventKey="credit sales" title="Credit Sales">
          <Credit/>
        <div>
              <Contact />
        </div>
        </Tab>
        
        <Tab eventKey="payment" title="Payment">
          < Payment/>
        Tab content for payment
          <div>
            
        </div>
      </Tab>
      <Tab eventKey="contact" title="Contact" disabled>
        Tab content for Cont,act
      </Tab>
      
      </Tabs>
  </div>
  )
}

export default Navigator