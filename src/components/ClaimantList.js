/*import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplayCardClaimer from "./DisplayCardClaimer";
import Navbar from "./Navbar";
import config from "./config";
import Spinner from "./Spinner";

const Base_URL = config.baseURL;

const ClaimantList = () => {
  const [claimants, setClaimants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchClaimants();
  }, []);

  const fetchClaimants = async () => {
    try {
      const res = await axios.get(`${Base_URL}/claimant`);
      setClaimants(res.data.gotClaimant);
    } catch (error) {
      console.error("Error fetching claimants:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <h1>Claimants List:</h1>
        {isLoading ? (
          <Spinner />
        ) : claimants.length === 0 ? (
          <p>No claimants found</p>
        ) : (
          claimants.map((claimant, index) => (
            <DisplayCardClaimer
              key={claimant._id}
              claimant={claimant}
              number={index + 1}
            />
          ))
        )}
      </div>
    </>
  );
};

export default ClaimantList;*/

//-------------------------------------------------
import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplayCardClaimer from "./DisplayCardClaimer";
import Navbar from "./Navbar";
import config from "./config";
import Spinner from "./Spinner";

const Base_URL = config.baseURL;

const ClaimantList = () => {
  const [claimants, setClaimants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClaimantIds, setSelectedClaimantIds] = useState([]);

  useEffect(() => {
    fetchClaimants();
  }, []);

  const fetchClaimants = async () => {
    try {
      const res = await axios.get(`${Base_URL}/claimant`);
      setClaimants(res.data.gotClaimant);
    } catch (error) {
      console.error("Error fetching claimants:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedClaimantIds([...selectedClaimantIds, id]);
    } else {
      setSelectedClaimantIds(
        selectedClaimantIds.filter((claimantId) => claimantId !== id)
      );
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedClaimantIds.length === 0) {
      alert("No claimant selected for deletion!");
    } else {
      try {
        const res = await axios.delete(
          `${Base_URL}/claimant/bulkdelete`,
          {
            data: { claimantIds: selectedClaimantIds }, // Send IDs in the request body
          },

        );

        if(res.status === 200){
            alert("Claimants Deleted Successfully!");
            fetchClaimants();
        } else{
          throw new Error ("Failed to delete claimants")
        }

      } catch (error) {
        console.error("Error during claimant deletion", error);
        alert("Failed to delete claimants");
      } finally {
        setSelectedClaimantIds([]); // Clear selection after deletion
      }
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <h1>Claimants List:</h1>
        {isLoading ? (
          <Spinner />
        ) : claimants.length === 0 ? (
          <p>No claimants found</p>
        ) : (
          <>
            <button
              onClick={handleDeleteSelected}
              disabled={selectedClaimantIds.length === 0}
            >
              Delete Selected
            </button>
            <table>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>#</th>
                  <th>Claimant Name</th>
                  <th>Item Claimed</th>
                  {/* Add other table headers */}
                </tr>
              </thead>
              <tbody>
                {claimants.map((claimant, index) => (
                  <tr key={claimant._id}>
                    <td>
                      <input
                        type="checkbox"
                        onChange={(event) =>
                          handleCheckboxChange(event, claimant._id)
                        }
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>{claimant.claimantname}</td>
                    <td>{claimant.itemdetails}</td>
                    {/* Render other claimant data */}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default ClaimantList;

